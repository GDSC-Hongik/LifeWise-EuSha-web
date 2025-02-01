import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // ✅ RefreshToken 쿠키 자동 포함
});

// 요청 인터셉터: AccessToken 자동 추가
API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: AccessToken 만료 시 자동 갱신
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러 (AccessToken 만료)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // ✅ 서버에서 RefreshToken으로 새 AccessToken 요청
        const res = await axios.post(
          "http://localhost:5000/api/refresh",
          {},
          { withCredentials: true }
        );

        // ✅ 새 AccessToken 저장
        localStorage.setItem("accessToken", res.data.accessToken);

        // ✅ 기존 요청 재시도
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${res.data.accessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Session expired. Please log in again.");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
