import axios from "axios";
import { API_PATH } from "../../../../appConst";

export const getAllProduct = () => {
  return axios.get(API_PATH + "/getAllProduct");
};

export const addProduct = (payload) => {
  return axios.post(API_PATH + "/insertProduct", payload);
};

export const updateProduct = (payload, id) => {
  return axios.put(API_PATH + "/updateProduct/" + id, payload);
};

export const deleteProduct = (id) => {
  return axios.delete(API_PATH + "/deleteProduct/" + id);
};

export const getProductById = (id) => {
  return axios.get(API_PATH + "/getProductByID/" + id);
};

export const uploadImageMainProduct = (payload) => {
  return axios.post(API_PATH + "/uploadImageMainProduct", payload);
};

export const updateListImageProduct = (payload) => {
  return axios.post(API_PATH + "/updateListImageProduct", payload);
};

export const insertChooseSize = (payload) => {
  return axios.post(API_PATH + "/insertChooseSize", payload);
};

export const getDetailsProduct = (id) => {
  return axios.get(API_PATH + "/getDetailsProduct/" + id);
};

export const getListImageProduct = (id) => {
  return axios.get(API_PATH + "/getListImageProduct/" + id);
};
