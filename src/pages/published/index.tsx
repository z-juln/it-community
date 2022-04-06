import React, { memo } from "react";
import queryString from "query-string";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";

export interface Query {
  title: string;
  id: string;
  type?: 'item' | 'set' | 'route';
}

export interface PublishedProps {}

export const Published: React.FC<PublishedProps> = () => {
  const { title, id, type = 'item' } = queryString.parse(
    window.location.search
  ) as any as Query;

  return (
    <div className={styles.Published}>
      <p className={styles.thanks}>
        {type === 'item' ? '发布' : '创建'}成功！有了你的分享，我们才会变得更好！
      </p>

      <section className={styles.articleSection}>
        <h2 className={styles.title}>
          <Link to={`/study-${type}/${id}`}>{title}</Link>
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
