import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_PROD_SERVER_URL
      : import.meta.env.VITE_DEV_SERVER_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // 공통 에러 처리
    if (error.response) {
      console.error(
        `API 요청 실패: HTTP ${error.response.status} (${error.response.data?.code}) - ${error.response.data?.message}`
      );
    } else if (error.request) {
      console.error('API 요청 실패: 서버 응답이 없습니다.');
    } else {
      console.error('API 요청 실패:', error.message);
    }
    return Promise.reject(error);
  }
);
