import React, { memo, useState } from "react";
import { useRecoilState } from "recoil";
import { Badge, Button, Space } from "antd";
import UserAvatar from "@/components/UserAvatar";
import { LogoutOutlined } from "@ant-design/icons";
import { popupLoginPanelState, userInfoState } from "@/store";
import DropdownMenuList from "../DropdownMenuList";
import UserModal from "../UserModal";
import tabConfig from "@/layouts/tabConfig";
import * as apis from "@/apis";
import styles from "./index.module.scss";
import type { CommonProps } from "@/@types/global";
import { useNavigate } from "react-router";

export interface UserProps extends CommonProps {}

const User: React.FC<UserProps> = ({ className = "", style = {} }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  console.log("userInfo: ", userInfo);

  const [popup, setPopup] = useRecoilState(popupLoginPanelState);

  const logout = () => {
    setUserInfo(null);
    apis.logout();
    navigate("/");
  };

  return (
    <div
      className={`${className} ${styles.User} ${
        userInfo ? styles.isLogin : ""
      }`}
      style={style}
    >
      {userInfo ? (
        <DropdownMenuList
          list={tabConfig.userDropDown}
          footer={
            <Space onClick={logout}>
              <LogoutOutlined />
              登出
            </Space>
          }
        >
          <Badge count={0}>
            <UserAvatar />
          </Badge>
        </DropdownMenuList>
      ) : (
        <>
          <Button onClick={() => setPopup(true)}>登入</Button>
          <UserModal visible={popup} onCancel={() => setPopup(false)} />
        </>
      )}
    </div>
  );
};

export default memo(User);
