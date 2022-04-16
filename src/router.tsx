import React from "react";
import { RouteObject, useRoutes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "@/pages/home";
import Ranking from "./pages/ranking";
import Notification from "./pages/Notification";
import AuthorCenter from "./pages/author-center";
import Contact from "./pages/contact";
import About from "./pages/about";
import NotFound from "./pages/404";
import StudyRoute from "./pages/studyRoute";
import StudySet from "./pages/studySet";
import StudyItem from "./pages/studyItem";
import Published from "./pages/published";
import StudyItemEditor from "./pages/author-center/inner/StudyItemEditor";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/study-route/:id", element: <StudyRoute /> },
  { path: "/study-set/:id", element: <StudySet /> },
  { path: "/study-item/:id", element: <StudyItem /> },
  { path: "/ranking", element: <Ranking /> },
  { path: "/notification", element: <Notification /> },
  { path: "/author-center", element: <AuthorCenter /> },
  { path: "/study-item/edit/:id", element: <StudyItemEditor /> },
  { path: "/published", element: <Published /> },
  { path: "/contact", element: <Contact /> },
  { path: "/about", element: <About /> },
  { path: "/404", element: <NotFound /> },
  { path: "/*", element: <NotFound /> },
];

const Routes: React.FC = () => useRoutes(routes);

const Router: React.FC = () => (
  <BrowserRouter>
    <MainLayout>
      <Routes />
    </MainLayout>
  </BrowserRouter>
);

export default Router;
