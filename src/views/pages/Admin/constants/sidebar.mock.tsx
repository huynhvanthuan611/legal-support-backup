import { Navigation } from "@toolpad/core/AppProvider";
import React from "react";
import { createTheme } from "@mui/material/styles";
import BusinessIcon from "@mui/icons-material/Business";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ArticleIcon from "@mui/icons-material/Article";
import CreateIcon from "@mui/icons-material/Create";
import RouterPath from "routers/routesContants";

export const adminCategories: Navigation = [
  {
    title: "Quảng trị viên",
    kind: "header",
  },
  {
    segment: RouterPath.ADMIN_DB,
    title: "Danh sách văn phòng",
    icon: <BusinessIcon />,
  },
  {
    segment: RouterPath.ADMIN_BUSINESS_DB,
    title: "Tạo văn phòng",
    icon: <AddBusinessIcon />,
  },
  {
    segment: RouterPath.ADMIN_VIEW_DB,
    title: "Quyền Admin",
    icon: <AdminPanelSettingsIcon />,
  },
  {
    segment: RouterPath.ADMIN_BLOG_VIEW_DB,
    title: "Danh Sách Blog",
    icon: <ArticleIcon />,
  },
  {
    segment: RouterPath.ADMIN_BLOG_DB,
    title: "Tạo Blog",
    icon: <CreateIcon />,
  },
];

export const demoTheme = createTheme({
  palette: {
    mode: "dark",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});
