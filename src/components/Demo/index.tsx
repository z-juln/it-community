import React, { memo } from "react";
import styles from "./index.module.scss";
import type { CommonProps } from "@/@types/global";

export interface DemoProps extends CommonProps {}

const Demo: React.FC<DemoProps> = ({ className = "", style = {} }) => {
  return (
    <div className={`${className} ${styles.Demo}`} style={style}>
      Demo
    </div>
  );
};

export default memo(Demo);
