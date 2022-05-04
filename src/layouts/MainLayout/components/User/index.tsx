import React, { memo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Badge, Button, message, Space } from "antd";
import UserAvatar from "@/components/UserAvatar";
import { LogoutOutlined } from "@ant-design/icons";
import { notificationState, popupLoginPanelState, userInfoState } from "@/store";
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
  const { unReadCount: notificationUnReadCount } = useRecoilValue(notificationState);

  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem('token');
    try {
      apis.logout();
    } catch {}
    navigate("/");
    window.location.reload();
    message.success('登出成功');
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
            <div onClick={logout}>
              <Space>
                <LogoutOutlined />
                登出
              </Space>
            </div>
          }
        >
          <Badge count={notificationUnReadCount} size='small'>
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
