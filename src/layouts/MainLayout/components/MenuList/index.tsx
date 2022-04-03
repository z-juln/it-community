import React, { memo } from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "./index.module.scss";
import type { CommonProps } from "@/@types/global";
import type { MenuItem } from "@/layouts/tabConfig";

export interface MenuListProps extends CommonProps {
  list: MenuItem[];
}

const MenuList: React.FC<MenuListProps> = ({
  list,
  className = "",
  style = {},
}) => {
  const { pathname } = useLocation();

  return (
    <ul className={`${className} ${styles.MenuList}`} style={style}>
      {list.map((menu, index) => (
        <li
          key={index}
          className={`
            ${styles.menuItem}
            ${menu.path === pathname ? styles.actived : ""}
          `}
        >
          <Link to={menu.path}>{menu.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default memo(MenuList);
