import axios from "axios";

import { endpoint } from "./../config";
import LocalStorageService from "./LocalStorageService";
import history from "./../history";

/**
 * api caller
 */
export const axiosInstant = axios.create({
  baseURL: endpoint,
  timeout: 10000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * handle request befor send to api
 */
axiosInstant.interceptors.request.use(
  (config) => {
    const token = LocalStorageService.getAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

/**
 * handle response befor response output from server
 */
axiosInstant.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response === undefined) {
      alert("can not connect to server");
      return Promise.reject(error);
    }
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url === `${endpoint}/users/newtoken`
    ) {
      history.push("/login");
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
      originalRequest._retry = true;
      isRefreshing = true;
      // const refreshToken = window.localStorage.getItem("refreshToken");
      return new Promise(function (resolve, reject) {
        axios
          .post(`${endpoint}/users/newtoken`, {
            refresh_token: LocalStorageService.getRefreshToken(),
          })
          .then(({ data }) => {
            window.localStorage.setItem("access_token", data.access_token);
            window.localStorage.setItem("refresh_token", data.refresh_token);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + data.access_token;
            originalRequest.headers["Authorization"] =
              "Bearer " + data.access_token;
            processQueue(null, data.token);
            resolve(axios(originalRequest));
          })
          .catch((err) => {
            history.push("/login");
            processQueue(err, null);
            reject(err);
          })
          .then(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(error);
  }
);
