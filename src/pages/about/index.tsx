import React, { memo } from "react";
import styles from "./index.module.scss";

export interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  return (
    <div className={styles.About}>
      <h2>关于我们</h2>
      <article>
        该项目是社区维护, 我们的核心成员有: &nbsp;&nbsp;<a href="https://github.com/z-juln">juln</a>、xxx、xxx...
        <br />
        <br />
        gitee地址: <a href="https://gitee.com/juln/it-community">https://gitee.com/juln/it-community</a>
        <br />
        <br />
        欢迎加入我们
      </article>
    </div>
  );
};

export default memo(About);
