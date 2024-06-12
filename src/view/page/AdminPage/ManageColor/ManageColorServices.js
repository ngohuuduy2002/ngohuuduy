import axios from "axios";
import { API_PATH } from "../../../../appConst";

export const getAllColors = () => {
  return axios.get(API_PATH + "/getAllColor");
};

export const addColors = (payload) => {
  return axios.post(API_PATH + "/insertColor", payload);
};

export const updateColors = (payload) => {
  return axios.put(API_PATH + "/updateColor", payload);
};

export const deleteColors = (id) => {
  return axios.delete(API_PATH + "/deleteColor/" + id);
};
