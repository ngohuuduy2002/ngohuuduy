import axios from "axios";
import { API_PATH } from "../../../../appConst";

export const getAllVouchers = () => {
  return axios.get(API_PATH + "/getAllVoucher");
};

export const insertVoucher = (payload) => {
  return axios.post(API_PATH + "/insertVoucher", payload);
};

export const updateVoucher = (payload) => {
  return axios.put(API_PATH + "/updateVoucher", payload);
};

export const deleteVoucher = (id) => {
  return axios.delete(API_PATH + "/deleteVoucher/" + id);
};
