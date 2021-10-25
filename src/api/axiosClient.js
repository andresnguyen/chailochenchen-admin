import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://www.faq-api.ezfrontend.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');
    if (ACCESS_TOKEN) {
      config.headers.common['Authorization'] = 'Bearer ' + ACCESS_TOKEN;
    }

    // Do something before request is sent
    return config;
  },

  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },

  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) {
      localStorage.removeItem('ACCESS_TOKEN');
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
