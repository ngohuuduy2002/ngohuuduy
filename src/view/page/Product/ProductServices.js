import axios from "axios";
import { API_PATH } from "../../../appConst";

export const getByCateID = (id) => {
  return axios.get(API_PATH + "/getByCateID/" + id);
};
