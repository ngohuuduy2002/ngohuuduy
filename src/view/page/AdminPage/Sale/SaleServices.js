import axios from "axios";
import { API_PATH } from "../../../../appConst";

export const getAllSales = () => {
  return axios.get(API_PATH + "/getAllSale");
};

export const addSales = (payload) => {
  return axios.post(API_PATH + "/insertSale", payload);
};

export const updateSales = (payload) => {
  return axios.put(API_PATH + "/updateSale", payload);
};

export const deleteSales = (id) => {
  return axios.delete(API_PATH + "/deleteSale/" + id);
};
