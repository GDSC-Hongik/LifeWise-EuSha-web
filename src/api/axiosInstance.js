// axiosInstance.js
// client가 어떠한 정보를 요청 할 때에도 더 편리하게
// POST, GET, PUT, DELETE 요청을 보낼 수 있도록 하는 중앙장치
// 코드의 간결화 목적
import axios from "axios";

const API = axios.create({
  baseURL: "https://life-wise.site", // 기저 AWS주소 변경

  // 서버에서 refreshToken을 다룬다면 쿠키를 다룸.
  // 이번에는 프론트에서 refreshToken을 직접 body에 담아 요청을 보내기 때문에
  // withCredentials가 필요없다.
  // withCredentials: true, // 쿠키에 저장된 refreshToken 자동 포함
});

// req/res이 서버로 가기 전에 중간에서 가로채서 수정할 수 있는 기능
// 모든 API요청이 전송되기 전에 accessToken을 자동으로 추가.
API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken"); // localStorage에서 accessToken 가져오기
    if (accessToken) {
      // accessToken이 있으면 Authorization 헤더에 추가
      // 백엔드 서버는 이 Authorization 헤더를 보고, 인증된 사용자인지 확인
      // Bearer ${token}은 JWT 토큰 방식에서 사용하는 인증 방식(Bearer 쓰고 띄어쓰기)
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  // 물어보기 (그러면 여기서 error가 발생하면 client에게 어떻게 보여지는 거야?)
  (error) => Promise.reject(error)
);

// accessToken이 만료되었다면 refreshToken를 body에 넣어 서버에 요청을 보낸다.

// accessToken 갱신 시도 코드
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          // refreshToken이 없다면 바로 로그아웃 처리
          localStorage.removeItem("accessToken");
          window.location.href = "/Login"; // 로그인 페이지로 이동
          return Promise.reject(error);
        }

        // refreshToken을 이용해 새로운 accessToken을 요청
        const refreshResponse = await axios.post(
          "https://life-wise.site/refreshToken",
          { refreshToken }, // 서버에 refreshToken 보내기
          { headers: { "Content-Type": "application/json" } }
        );

        // 성공적으로 새로운 accessToken을 받았다면 localStorage에 저장
        localStorage.setItem("accessToken", refreshResponse.data.accessToken);

        // 원래 실패한 요청에 새로운 accessToken을 추가해서 재요청
        error.config.headers[
          "Authorization"
        ] = `Bearer ${refreshResponse.data.accessToken}`;

        return API(error.config);
      } catch (refreshError) {
        console.error(
          "refreshToken을 이용하여 accessToken갱신 실패",
          refreshError
        );

        // refreshToken 갱신에 실패했다면 로그아웃 처리
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/Login"; // 로그인 페이지로 이동
      }
    }

    return Promise.reject(error);
  }
);

export default API;
