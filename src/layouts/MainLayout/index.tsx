import React, { memo } from "react";
import { useLocation } from "react-router";
import MenuList from "./components/MenuList";
import User from "./components/User";
import tabConfig from "../tabConfig";
import fullPageConfig from "../fullPageConfig";
import styles from "./index.module.scss";
import type { CommonProps } from "@/@types/global";

const { top: topMenuList, userDropDown: userMenuList } = tabConfig;

export interface MainLayoutProps extends CommonProps {}

const MainLayout: React.FC<MainLayoutProps> = ({
  className = "",
  style = {},
  children,
}) => {
  const { pathname } = useLocation();

  if (fullPageConfig.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className={className} style={style}>
      <div className={styles.MainLayout}>
        {/* tabBar */}
        <section className={styles.tabBar}>
          {/* <div className={styles.oldLogo}>
            <a href="/">
              <p>it community</p>
            </a>
          </div> */}
          <div className={styles.logo}>
            <a href="/">
              <img src="/logo.png" alt="" />
            </a>
          </div>
          <MenuList className={styles.topMenuList} list={topMenuList} />
          <div className={styles.rightNav}>
            <User className={styles.userInfo} />
          </div>
        </section>

        {/* pageBody */}
        <div className={styles.pageBody}>{children}</div>
      </div>
    </div>
  );
};

export default memo(MainLayout);
