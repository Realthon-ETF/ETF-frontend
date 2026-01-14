// first version
// import axios from 'axios';

// // 1. Axios 인스턴스 생성
// const api = axios.create({
//   baseURL: 'https://api.yourdomain.com',
//   withCredentials: true, // 쿠키(Refresh Token)를 주고받기 위해 필수
// });

// // 2. 요청 인터셉터: 메모리에 있는 Access Token을 헤더에 삽입
// // (이 변수는 실제로는 AuthContext 등에서 관리하는 것이 좋습니다)
// let accessToken = null;

// export const setClientToken = (token) => {
//   accessToken = token;
// };

// api.interceptors.request.use((config) => {
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// });

// // 3. 응답 인터셉터: 401 에러(토큰 만료) 발생 시 갱신 시도
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // 401 에러이고 재시도한 적이 없을 때
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // /refresh 엔드포인트는 HttpOnly 쿠키를 읽어 새 Access Token을 반환함
//         const { data } = await axios.post(
//           'https://api.yourdomain.com/auth/refresh',
//           {},
//           { withCredentials: true }
//         );

//         const newAccessToken = data.accessToken;
//         setClientToken(newAccessToken); // 새 토큰 저장

//         // 기존 요청의 헤더를 새 토큰으로 교체 후 재요청
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         // Refresh Token마저 만료된 경우 로그아웃 처리
//         console.error('Session expired. Please login again.');
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;

// second version
// import axios, {
//   type AxiosInstance,
//   type AxiosResponse,
//   type InternalAxiosRequestConfig,
// } from "axios";

// // 1. Type the memory token (Allow string or null)
// let accessToken: string | null = null;

// export const setClientToken = (token: string | null): void => {
//   accessToken = token;

// };

// const api: AxiosInstance = axios.create({
//   baseURL: "https://api.etf.r-e.kr",
//   withCredentials: true,
// });

// // 2. Request Interceptor
// api.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     if (accessToken) {
//       // TypeScript knows headers exist on config
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // 3. Response Interceptor
// api.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Custom check: We need to extend the type or use type casting for '_retry'
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // Define the shape of your refresh response
//         const { data } = await axios.post<{ accessToken: string }>(
//           "https://api.yourdomain.com/auth/refresh",
//           {},
//           { withCredentials: true }
//         );

//         const newAccessToken = data.accessToken;
//         setClientToken(newAccessToken);

//         // Update the original request with the new token
//         if (originalRequest.headers) {
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         }

//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error("Session expired. Please login again.");
//         // In a real React app, you might want to use a callback instead of window.location
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;

// 기본 API 호출용 Axios instance
import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

let accessToken: string | null = null;

// export const setClientToken = (token: string | null): void => {
//   accessToken = token;
// };
export const setClientToken = (
  access: string | null,
  refresh?: string | null
): void => {
  accessToken = access;
  if (refresh) {
    localStorage.setItem("refreshToken", refresh); // Or a non-HttpOnly cookie
  } else if (refresh === null) {
    localStorage.removeItem("refreshToken");
  }
};

const api: AxiosInstance = axios.create({
  baseURL: "https://etf-766469416566.asia-northeast3.run.app",
  withCredentials: true, // Refresh Token(Cookie)를 주고받기 위한 옵션
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (accessToken) {
      // accessToken이 memory에 있는 동안에는 모든 request header에 해당 token을 포함시켜 전달함
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
// 401 Error(Token Expired) 발생 시 Token 갱신 시도
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for 401 and ensure we haven't retried this specific request yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // IMPORTANT: Use the correct base URL for your refresh endpoint
        // The Refresh Token is sent automatically via Cookies because of withCredentials
        const { data } = await axios.post<{ accessToken: string }>(
          "https://etf-766469416566.asia-northeast3.run.app/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newAccessToken = data.accessToken;
        setClientToken(newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        // Retry the original request with the new token
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, the Refresh Token is likely expired/invalid
        setClientToken(null);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
