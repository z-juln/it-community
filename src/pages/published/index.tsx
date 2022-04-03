import React, { memo } from "react";
import queryString from "query-string";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";

export interface Query {
  title: string;
  id: string;
}

export interface PublishedProps {}

export const Published: React.FC<PublishedProps> = () => {
  const { title, id } = queryString.parse(
    window.location.search
  ) as any as Query;

  return (
    <div className={styles.Published}>
      <p className={styles.thanks}>
        发布成功！有了你的分享，我们才会变得更好！
      </p>

      <section className={styles.articleSection}>
        <h2 className={styles.title}>
          <Link to={`/study-item/${id}`}>{title}</Link>
        </h2>
        <br />
      </section>

      <Link to="/" className={styles.goHome}>
        回到首页
      </Link>
    </div>
  );
};

export default memo(Published);
