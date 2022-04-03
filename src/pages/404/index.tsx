import React, { memo, useEffect } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import styles from "./index.module.scss";

export interface NoFoundProps {}

const NoFound: React.FC<NoFoundProps> = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== "/404") {
      navigate("/404");
    }
  }, []);

  return (
    <div className={styles.NoFound}>
      <h2>404</h2>
      <Button className={styles.callbackBtn}>
        <Link to="/">回到首页</Link>
      </Button>
    </div>
  );
};

export default memo(NoFound);
