export const API_PATH = "http://localhost:9090";
export const COLOR = {
  primary: "#6366f1",
  textWhite: "#fff",
};
export const STATUS = {
  SUCCESS: 200,
  UNAUTHORIZED_ERROR: 401,
  FORBIDDEN_ERROR: 403,
};

export const PATH = {
  PROFILE: { code: 1, name: "", path: "/profile" },
  LIST_PRODUCT: { code: 1, name: "Clothes", path: "/list_product" },
  HOME: { code: 1, name: "Home page", path: "/" },
};

export const STATUS_ORDER = [
  { code: 1, name: "Wait for user confirmation" },
  { code: 2, name: "Wait for the seller to confirm" },
  { code: 3, name: "Waiting for delivery" },
  { code: 4, name: "Waiting for delivery" },
  { code: 5, name: "Delivered" },
];

export const OBJECT_STATUS_ORDER = {
  CHO_NGUOI_DUNG_XAC_NHAN: { code: 1, name: "Wait for user confirmation" },
  CHO_NGUOI_BAN_XAC_NHAN: { code: 2, name: "Wait for the seller to confirm" },
  CHO_LAY_HANG: { code: 3, name: "Waiting for delivery" },
  CHO_GIAO_HANG: { code: 4, name: "Waiting for delivery" },
  DA_GIAO: { code: 5, name: "Delivered" },
};
