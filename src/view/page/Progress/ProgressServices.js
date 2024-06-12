import axios from "axios";
import { API_PATH } from "../../../appConst";

export const getOrderByProfile = (id) => {
  return axios.get(API_PATH + "/getOrderByProfile/" + id);
};

export const confirmRepair = (id) => {
  return axios.post(API_PATH + "/confirmRepair/" + id);
};
