import React, { memo, useState } from "react";
import styles from "./index.module.scss";
import { Button, message } from "antd";
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
  const [applyLoading, setApplyLoading] = useState(false);

  if (!userInfo) {
    throw new Error("用户信息不存在");
  }

  const handleApply = () => {
    setApplyLoading(true);
    apis.applyProvider(userInfo.uid)
      .then(({ data, code }) => {
        if (code !== 1) {
          throw new Error('申请失败');
        }
        message.success("申请成功");
        setUserInfo(data);
        onApply();
      })
      .catch(() => {
        message.success("申请失败");
      })
      .finally(() => {
        setApplyLoading(false);
      });
  };

  return (
    <div className={`${className} ${styles.Apply}`} style={style}>

      <article>
        <h2>贡献者须知</h2>
        <pre>xxxxxx</pre>
      </article>
      
      <Button
        className={styles.applyBtn}
        onClick={handleApply}
        loading={applyLoading}
      >
        申请
      </Button>
    </div>
  );
};

export default memo(Apply);
