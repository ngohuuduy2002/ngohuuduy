import axios from "axios";
import { API_PATH } from "../../../../appConst";

export const getAllOrder = () => {
  return axios.get(API_PATH + "/getAllOrder");
};

export const addSize = (payload) => {
  return axios.post(API_PATH + "/insertSize", payload);
};

export const updateSize = (payload) => {
  return axios.put(API_PATH + "/updateSize", payload);
};

export const deleteSize = (id) => {
  return axios.delete(API_PATH + "/deleteSize/" + id);
};

export const updateStatusOrder = (payload) => {
  return axios.put(API_PATH + "/updateStatusOrder", payload);
};
