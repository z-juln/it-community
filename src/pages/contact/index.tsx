import React, { memo } from "react";
import styles from "./index.module.scss";

export interface ContactProps {}

const Contact: React.FC<ContactProps> = () => {
  return <div className={styles.Contact}>Contact</div>;
};

export default memo(Contact);
