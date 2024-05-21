import { Home, SpaceDashboard } from "@mui/icons-material";
import React from "react";

const routes = [
  {
    name: "Dashboard",
    layout: "/dashboard",
    path: "/",
    icon: <Home className="h-6 w-6 " />,
  },
  {
    name: "Moodboard",
    layout: "/moodboard",
    path: "/",
    icon: <SpaceDashboard className="h-6 w-6 " />,
  },
];
export default routes;
