import axios from "axios";
import { API_PATH } from "../../../../appConst";

export const getProductDetails = () => {
  return axios.get(API_PATH + "/getProductDetails");
};

export const insertProductDetails = (payload) => {
  return axios.post(API_PATH + "/insertProductDetails", payload);
};

export const updateProductDetails = (payload) => {
  return axios.post(
    API_PATH + "/updateProductDetails/" + payload?.idProduct,
    payload
  );
};

export const deleteProductDetails = (id) => {
  return axios.delete(API_PATH + "/deleteProductDetails/" + id);
};
