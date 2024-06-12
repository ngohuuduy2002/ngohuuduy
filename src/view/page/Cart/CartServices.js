import axios from "axios";
import { API_PATH } from "../../../appConst";

export const getAllCart = () => {
  return axios.get(API_PATH + "/getAllCart");
};

export const getCartByIDProfile = (id) => {
  return axios.get(API_PATH + "/getCartByIDProfile/" + id);
};

export const deleteCart = (id) => {
  return axios.delete(API_PATH + "/delete/" + id);
};

export const insertBill = (payload) => {
  return axios.post(API_PATH + "/insertBill", payload);
};

export const applyVoucher = (payload) => {
  return axios.post(API_PATH + "/applyVoucher", payload);
};
