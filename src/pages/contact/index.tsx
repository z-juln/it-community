import React, { memo, useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "./index.module.scss";

export interface ContactProps {}

const Contact: React.FC<ContactProps> = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/about');
  }, []);
  return (
    <div className={styles.Contact}>
      {/* Contact */}
    </div>
  );
};

export default memo(Contact);
