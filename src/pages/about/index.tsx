import React, { memo } from "react";
import styles from "./index.module.scss";

export interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  return <div className={styles.About}>About</div>;
};

export default memo(About);
