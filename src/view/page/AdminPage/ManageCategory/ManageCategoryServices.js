import axios from "axios";
import { API_PATH } from "../../../../appConst";

export const getAllCategorys = () => {
  return axios.get(API_PATH + "/getAllCategory");
};

export const addCategory = (payload) => {
  return axios.post(API_PATH + "/insertCate", payload);
};

export const updateCategory = (payload) => {
  return axios.put(API_PATH + "/updateCate", payload);
};

export const deleteCategory = (id) => {
  return axios.delete(API_PATH + "/deleteCate/" + id);
};
