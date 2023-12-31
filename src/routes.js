/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import React from "react";
// import Notifications from "views/Notifications.js";
// import Icons from "views/Icons.js";
// import Typography from "views/Typography.js";
// import TableList from "views/Tables.js";
// import Maps from "views/Map.js";
// import UserPage from "views/User.js";
// import UpgradeToPro from "views/Upgrade.js";
// import Inventory from "views/Inventory";
import Invoice from "views/invoice";
import Product from "views/product";
import Module from "views/Module";
import Address from "views/Address";
var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    // icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: <Notifications />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "nc-icon nc-single-02",
  //   component: <UserPage />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Invoice",
  //   icon: "nc-icon nc-tile-56",
  //   component: <Invoice />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: <Typography />,
  //   layout: "/admin",
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: <UpgradeToPro />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/inventory",
  //   name: "Inventory",
  //   icon: "nc-icon nc-pin-3",
  //   component: <Inventory />,
  //   layout: "/admin",
  // },
  {
    path: "/module",
    name: "Module",
    // icon: "nc-icon nc-pin-3",
    component: <Module />,
    layout: "/admin",
  },
  {
    path: "/Address",
    name: "Adress",
    // icon: "nc-icon nc-pin-3",
    component: <Address />,
    layout: "/admin",
  },
  // {
  //   path: "/invoice",
  //   name: "Invoice",
  //   // icon: "nc-icon nc-pin-3",
  //   component: <Invoice />,
  //   layout: "/admin",
  // },
];
export default routes;
