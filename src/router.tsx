import React from "react";
import { RouteObject, useRoutes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "@/pages/home";

const routes: RouteObject[] = [{ path: "/", element: <Home /> }];

const Routes: React.FC = () => useRoutes(routes);

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export default Router;
