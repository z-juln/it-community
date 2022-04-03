import React, { memo } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, Dropdown, Space } from "antd";
import styles from "./index.module.scss";
import type { CommonProps } from "@/@types/global";
import type { MenuItem } from "@/layouts/tabConfig";

export interface DropdownMenuListProps extends CommonProps {
  list: MenuItem[];
  footer?: React.ReactChildren | JSX.Element;
}

const DropdownMenuList: React.FC<DropdownMenuListProps> = ({
  list,
  className = "",
  style = {},
  footer,
  children,
}) => {
  const { pathname } = useLocation();

  const menuNode = (
    <Menu>
      {list.map((menu, index) => (
        <Menu.Item
          key={index}
          className={`${menu.path === pathname ? styles.actived : ""}`}
        >
          <Link to={menu.path}>
            <Space>
              {menu.icon}
              {menu.label}
            </Space>
          </Link>
        </Menu.Item>
      ))}
      <Menu.Divider />
      <Menu.Item>{footer}</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menuNode}
      overlayClassName={`${styles.DropdownMenuList} ${className}`}
      overlayStyle={style}
      trigger={["click"]}
      placement="bottomCenter"
    >
      {children}
    </Dropdown>
  );
};

export default memo(DropdownMenuList);
