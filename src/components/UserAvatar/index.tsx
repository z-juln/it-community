import React, { memo } from "react";
import styles from "./index.module.scss";
import { useRecoilValue } from "recoil";
import { Avatar, AvatarProps } from "antd";
import { userInfoState } from "@/store";
import type { CommonProps } from "@/@types/global";

export interface UserAvatarProps
  extends Omit<CommonProps, "children">,
    AvatarProps {}

const UserAvatar: React.FC<UserAvatarProps> = ({
  className = "",
  style = {},
}) => {
  const userInfo = useRecoilValue(userInfoState);

  if (!userInfo) {
    throw new Error("userInfo不存在");
  }

  return (
    <div className={`${className} ${styles.UserAvatar}`} style={style}>
      <Avatar
        shape="circle"
        // icon={<UserOutlined />}
        src={userInfo.avatar}
        style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
      >
        {userInfo.name.toLocaleUpperCase()}
      </Avatar>
    </div>
  );
};

export default memo(UserAvatar);
