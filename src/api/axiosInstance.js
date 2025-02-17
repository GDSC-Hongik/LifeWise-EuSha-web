// axiosInstance.js
// client가 어떠한 정보를 요청 할 때에도 더 편리하게
// POST, GET, PUT, DELETE 요청을 보낼 수 있도록 하는 중앙장치
// 코드의 간결화 목적
import axios from "axios";

const API = axios.create({
  baseURL: "http://43.201.193.230:8080", // 기저 AWS주소 변경

  // 서버에서 refreshToken을 다룬다면 쿠키를 다룸.
  // 이번에는 프론트에서 refreshToken을 직접 body에 담아 요청을 보내기 때문에
  // withCredentials가 필요없다.
  // withCredentials: true, // 쿠키에 저장된 refreshToken 자동 포함
});

// req/res이 서버로 가기 전에 중간에서 가로채서 수정할 수 있는 기능
// 모든 API요청이 전송되기 전에 accessToken을 자동으로 추가.
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // localStorage에서 accessToken 가져오기
    if (token) {
      // accessToken이 있으면 Authorization 헤더에 추가
      // 백엔드 서버는 이 Authorization 헤더를 보고, 인증된 사용자인지 확인
      // Bearer ${token}은 JWT 토큰 방식에서 사용하는 인증 방식(Bearer 쓰고 띄어쓰기)
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  // 물어보기 (그러면 여기서 error가 발생하면 client에게 어떻게 보여지는 거야?)
  (error) => Promise.reject(error)
);

// accessToken이 만료되었다면 refreshToken를 body에 넣어 서버에 요청을 보낸다.

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 서버에서 401 Unauthorized 에러가 오면, accessToken이 만료된것으로 판단.
    if (error.response && error.response.status === 401) {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        // 만약 refreshToken이 없다면 토큰삭제 후 로그인 페이지로 이동
        if (!refreshToken) {
          localStorage.removeItem("accessToken");
          // 추후 주석 해제
          // window.location.href = "/Login";
          return Promise.reject(error);
        }

        // refreshToken을 사용해 새로운 accessToken 요청부분
        const refreshResponse = await axios.post(
          "http://43.201.193.230:8080/members/refreshToken",
          { refreshToken }, // body 부분
          { headers: { "Content-Type": "application/json" } }
        );

        // 새로 받은 accessToken을 localStorage에 저장
        localStorage.setItem("accessToken", refreshResponse.data.accessToken);

        // 원래 실패했던 요청의 Authorization 헤더를 새로운 accessToken으로 업데이트
        error.config.headers[
          "Authorization"
        ] = `Bearer ${refreshResponse.data.accessToken}`;

        return API(error.config);
      } catch (refreshError) {
        console.error(
          "refreshToken을 이용하여 accessToken갱신 실패",
          refreshError
        );
      }

      // refreshToken이 있는데 만료되었다면 로그아웃이 처리
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/Login";
    }

    return Promise.reject(error);
  }
);

export default API;
