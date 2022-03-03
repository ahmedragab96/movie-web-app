import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 10000,
});

instance.interceptors.request.use((config) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")!);
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${currentUser ? currentUser.accessToken : ""}`,
  };
  return config;
});

instance.interceptors.response.use(
  (response) => {    
    return response.data;
  },
  (error) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      console.log(error);
    }
    return Promise.reject(error);
  }
);
