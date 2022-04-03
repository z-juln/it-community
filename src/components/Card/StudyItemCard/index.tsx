import React, { memo } from "react";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import type { CommonProps } from "@/@types/global";
import type { StudyItem } from "@/model";

export interface StudyItemCardProps extends CommonProps {
  data: StudyItem;
}

const StudyItemCard: React.FC<StudyItemCardProps> = ({
  className = "",
  style = {},
  data,
}) => {
  return (
    <div className={`${className} ${styles.StudyItemCard}`} style={style}>
      <a href={`/study-item/${data.id}`} key={data.id}>
        <li className={styles.card}>
          <p className={styles.title}>{data.title}</p>
          <p className={styles.detail}>{data.detail}</p>
          <div className={styles.subData}>
            <LikeOutlined /> {data.praise_count}
            &nbsp; / &nbsp;
            <DislikeOutlined /> {data.tread_count}
          </div>
        </li>
      </a>
    </div>
  );
};

export default memo(StudyItemCard);
