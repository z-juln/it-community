import React, { memo } from "react";
import styles from "./index.module.scss";
import type { CommonProps } from "@/@types/global";

export interface CommonLayoutProps extends CommonProps {}

const CommonLayout: React.FC<CommonLayoutProps> = ({
  className = "",
  style = {},
  children,
}) => {
  return (
    <div className={className} style={style}>
      <div className={styles.CommonLayout}>
        CommonLayout
        {children}
      </div>
    </div>
  );
};

export default memo(CommonLayout);
