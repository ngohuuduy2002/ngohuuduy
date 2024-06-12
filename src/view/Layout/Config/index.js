import { SvgIcon } from "@material-ui/core";
import {
  AirplanemodeActiveOutlined,
  AssignmentTurnedIn,
  ColorLens,
  Dashboard,
  FormatSize,
  LibraryAdd,
  SaveOutlined,
  ShoppingCart,
  SignalCellularConnectedNoInternet0BarTwoTone,
} from "@material-ui/icons";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const items = () => {
  const roleBasedItems = [
    {
      title: "Overview",
      path: "/admin",
      icon: (
        <SvgIcon fontSize="small">
          <Dashboard />
        </SvgIcon>
      ),
    },
    {
      title: "Product Management",
      path: "/admin/list-products",
      icon: (
        <SvgIcon fontSize="small">
          <ShoppingCart />
        </SvgIcon>
      ),
    },
    {
      title: "Product details",
      path: "/admin/detail-products",
      icon: (
        <SvgIcon fontSize="small">
          <ShoppingCart />
        </SvgIcon>
      ),
    },
    {
      title: "Manage product types",
      path: "/admin/category-product",
      icon: (
        <SvgIcon fontSize="small">
          <LibraryAdd />
        </SvgIcon>
      ),
    },
    {
      title: "Product color management",
      path: "/admin/colors",
      icon: (
        <SvgIcon fontSize="small">
          <ColorLens />
        </SvgIcon>
      ),
    },
    {
      title: "Manage product sizes",
      path: "/admin/sizes",
      icon: (
        <SvgIcon fontSize="small">
          <FormatSize />
        </SvgIcon>
      ),
    },
    {
      title: "Order management",
      path: "/admin/orders",
      icon: (
        <SvgIcon fontSize="small">
          <AirplanemodeActiveOutlined />
        </SvgIcon>
      ),
    },
    {
      title: "Discount code",
      path: "/admin/sales",
      icon: (
        <SvgIcon fontSize="small">
          <SaveOutlined />
        </SvgIcon>
      ),
    },
    {
      title: "Coupons",
      path: "/admin/vouchers",
      icon: (
        <SvgIcon fontSize="small">
          <AssignmentTurnedIn />
        </SvgIcon>
      ),
    },
  ];

  return roleBasedItems.filter(Boolean);
};
