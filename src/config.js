import dotenv from "dotenv";
import LocalStorageService from "./service/LocalStorageService";

dotenv.config();

const endpoint = () =>
  LocalStorageService.getApiUrl()
    ? LocalStorageService.getApiUrl()
    : process.env.REACT_APP_API_ENDPOINT;

export { endpoint };
