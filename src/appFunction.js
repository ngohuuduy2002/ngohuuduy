import { createFilterOptions } from "@mui/material";
import { OBJECT_STATUS_ORDER, PATH } from "./appConst";

export const getTitlePage = (text) => {
  switch (text) {
    case PATH.HOME.path:
      return PATH.HOME.name;
    case PATH.LIST_PRODUCT.path:
      return PATH.LIST_PRODUCT.name;
    case PATH.LIST_PRODUCT.path:
      return PATH.PROFILE.name;

    default:
      return PATH.HOME.name;
  }
};

const filterAutocomplete = createFilterOptions();
export const filterOptions = (options, params, isNew, displayLable) => {
  params.inputValue = params.inputValue?.trim();
  let filtered = filterAutocomplete(options, params);

  if (isNew && filtered?.length === 0) {
    filtered.push({ [displayLable]: "Add new", code: "New" });
  }

  return filtered;
};

export const getCurrentUser = () => {
  let user = JSON.parse(localStorage.getItem("currentuser"));
  return user;
};

export const convertToDate = (milliseconds) => {
  var date = new Date(milliseconds);
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return day + "/" + month + "/" + year;
};

export const convertDate = (inputDate) => {
  // Chuyển inputDate thành kiểu Date
  var inputDateObj = new Date(inputDate);

  // Lấy ngày, tháng, năm
  var year = inputDateObj.getFullYear();
  var month = inputDateObj.getMonth() + 1; // Tháng bắt đầu từ 0
  var day = inputDateObj.getDate();

  // Format lại ngày thành chuỗi "YYYY-MM-DD"
  var newDate =
    year +
    "-" +
    (month < 10 ? "0" : "") +
    month +
    "-" +
    (day < 10 ? "0" : "") +
    day;

  return newDate;
};

// export const convertToISOString = (dateString) => {
//   const date = new Date(dateString);
//   const isoString = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
//   return isoString;
// };

export const getStatusOrder = (name) => {
  switch (name) {
    case OBJECT_STATUS_ORDER.CHO_NGUOI_DUNG_XAC_NHAN.name:
      return OBJECT_STATUS_ORDER.CHO_NGUOI_DUNG_XAC_NHAN;
    case OBJECT_STATUS_ORDER.CHO_NGUOI_BAN_XAC_NHAN.name:
      return OBJECT_STATUS_ORDER.CHO_NGUOI_BAN_XAC_NHAN;
    case OBJECT_STATUS_ORDER.CHO_LAY_HANG.name:
      return OBJECT_STATUS_ORDER.CHO_LAY_HANG;
    case OBJECT_STATUS_ORDER.CHO_GIAO_HANG.name:
      return OBJECT_STATUS_ORDER.CHO_GIAO_HANG;
    case OBJECT_STATUS_ORDER.DA_GIAO.name:
      return OBJECT_STATUS_ORDER.DA_GIAO;

    default:
      return OBJECT_STATUS_ORDER.CHO_NGUOI_DUNG_XAC_NHAN;
  }
};

export const formatCurrency = (number) => {
  return (number || 0)?.toLocaleString("vi-VN") + " đ";
};
