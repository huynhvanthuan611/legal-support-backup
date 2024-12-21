import { Navigation } from "@toolpad/core/AppProvider";
import React from "react";
import { createTheme } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RouterPath from "routers/routesContants";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChatIcon from "@mui/icons-material/Chat";

export const categories: Navigation = [
  {
    title: "Chức năng",
    kind: "header",
  },
  {
    segment: RouterPath.CHAT_DB,
    title: "Tư vấn",
    icon: <DashboardIcon />,
  },
  {
    title: "Lưu Trữ",
    kind: "header",
  },
  {
    segment: RouterPath.CHAT_HISTORY_DB,
    title: "Yêu thích",
    icon: <FavoriteIcon/>,
  },
  {
    segment: RouterPath.CHAT_LOCAL_HISTORY_DB,
    title: "Lịch sử chat",
    icon: <ChatIcon/>,
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
