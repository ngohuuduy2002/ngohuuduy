import axios from "axios";
import { API_PATH } from "../../../appConst";

export const register = (payload) => {
  return axios.post(API_PATH + "/register", payload);
};

export const confirmRegistration = (payload) => {
  return axios.get(API_PATH + "/confirm-registration", payload);
};
