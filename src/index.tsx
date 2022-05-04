import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import reportWebVitals from "@/reportWebVitals";
import Router from "./router";
import { useInit as useNotificationInit } from "./pages/Notification/utils";
import "antd/dist/antd.css";
import "@/styles/global.scss";
import "juln-color";
import "juln-color/lib/theme.css";

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

const App: React.FC = ({
  children
}) => {
  useNotificationInit();
  return (
    <>
      {children}
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App>
        <Router />
      </App>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
