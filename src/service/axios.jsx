import axios from "axios";

import { endpoint } from "./../config";
import LocalStorageService from "./LocalStorageService";
import history from "./../history";

/**
 * api caller
 */
export const axiosInstant = () => {
  /** create axios object */
  let _axios = axios.create({
    baseURL: endpoint(),
    timeout: 10000,
    withCredentials: false,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  /**
   * handle request befor send to api
   */
  _axios.interceptors.request.use(
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
  _axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (error.response === undefined) {
        alert("can not connect to server");
        return Promise.reject(error);
      }
      if (error.response.status === 401) {
        history.push("/login");
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );

  return _axios;
};
