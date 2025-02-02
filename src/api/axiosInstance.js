// axiosInstance.js
// client가 어떠한 정보를 요청 할 때에도 더 편리하게
// POST, GET, PUT, DELETE 요청을 보낼 수 있도록 하는 중앙장치
// 코드의 간결화 목적
import axios from "axios";

const API = axios.create({
  baseURL: "http://AWS", // AWS주소 변경
  withCredentials: true, // 쿠키에 저장된 refreshToken 자동 포함
});

// req/res이 서버로 가기 전에 중간에서 가로채서 수정할 수 있는 기능
// 모든 API요청이 전송되기 전에 accessToken을 자동으로 추가.
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // localStorage에서 accessToken 가져오기
    if (token) {
      // accessToken이 있으면 Authorization 헤더에 추가
      // 백엔드 서버는 이 Authorization 헤더를 보고, 인증된 사용자인지 확인
      // Bearer ${token}은 JWT 토큰 방식에서 사용하는 인증 방식
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  // 물어보기 (그러면 여기서 error가 발생하면 client에게 어떻게 보여지는 거야?)
  (error) => Promise.reject(error)
);

// accessToken이 만료되면 자동 갱신??
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // accessToken이 만료된 경우
      try {
        const refreshResponse = await axios.post(
          "http://AWS/members/refreshToken",
          {},
          { withCredentials: true }
        );
        localStorage.setItem("accessToken", refreshResponse.data.accessToken);
        error.config.headers[
          "Authorization"
        ] = `Bearer ${refreshResponse.data.accessToken}`;
        return axios(error.config); // 실패했던 요청 재시도
      } catch (refreshError) {
        console.error("토큰 갱신 실패", refreshError);
        localStorage.removeItem("accessToken");
        window.location.href = "/login"; // 로그인 페이지로 이동
      }
    }
    return Promise.reject(error);
  }
);

export default API;
