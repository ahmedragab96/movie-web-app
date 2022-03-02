// http://www.omdbapi.com/?i=tt3896198&apikey=c3dbb1a8
import axios from "axios";
import { config as envConfig } from "../config";

export const instance = axios.create({
  baseURL: envConfig.OMDBBaseUrl,
  timeout: 10000,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    config.params.apikey = envConfig.OMDBToken;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
