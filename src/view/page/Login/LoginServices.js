import axios from "axios";
import { API_PATH } from "../../../appConst";

export const login = (payload) => {
  return axios.post(API_PATH + "/login", payload);
};

export const generateOtp = (payload) => {
  return axios.post(API_PATH + "/generateOtp", payload);
};

export const validateOtp = (payload) => {
  return axios.post(API_PATH + "/validateOtp", payload);
};
