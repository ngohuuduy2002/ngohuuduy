import axios from "axios";
import { API_PATH } from "../appConst";

export const getProductCategory = () => {
  return axios.get(API_PATH + "/getAllCategory");
};
