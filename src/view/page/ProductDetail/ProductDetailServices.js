import axios from "axios";
import { API_PATH } from "../../../appConst";

export const getProductByID = (id) => {
  return axios.get(API_PATH + "/getProductByID/" + id);
};

export const getProductDetailByID = (id) => {
  return axios.get(API_PATH + "/getDetailsProduct/" + id);
};

export const addToCart = (payload) => {
  return axios.post(API_PATH + "/insertCart", payload);
};
