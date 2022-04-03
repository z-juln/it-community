import React, { memo } from "react";
import styles from "./index.module.scss";
import { Button } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfoState } from "@/store";
import * as apis from "@/apis";
import type { CommonProps } from "@/@types/global";

export interface ApplyProps extends CommonProps {
  onApply: () => void;
}

const Apply: React.FC<ApplyProps> = ({
  className = "",
  style = {},
  onApply,
}) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  if (!userInfo) {
    throw new Error("用户信息不存在");
  }

  const handleApply = async () => {
    const { data: newUserInfo } = await apis.applyProvider(userInfo.uid);
    if (!newUserInfo) {
      // TODO 申请失败
      alert("申请失败");
    }
    setUserInfo(newUserInfo);
    onApply();
  };

  return (
    <div className={`${className} ${styles.Apply}`} style={style}>
      {/* TODO */}
      <br />
      <p>未完成</p>
      <br />
      <Button onClick={handleApply}>申请</Button>
    </div>
  );
};

export default memo(Apply);
