import React, { memo } from "react";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import type { CommonProps } from "@/@types/global";
import type { StudyItem } from "@/model";

export interface RequiredData {
  id: number;
  name: string;
  detail?: string;
  praise_count: number;
  tread_count: number;
  cover?: string;
}

export interface CommonCardProps<T extends RequiredData = RequiredData>
  extends CommonProps {
  data: T;
  getLink?: (data: T) => string;
  getDefaultDetail?: (data: T) => string;
}

const CommonCard: React.FC<CommonCardProps> = <T,>({
  className = "",
  style = {},
  data,
  getLink,
  getDefaultDetail,
}: CommonCardProps<RequiredData>) => {
  const link = getLink?.(data) ?? "javascript: void(0)";
  const defaultDetail = getDefaultDetail?.(data) ?? "暂无描述";

  return (
    <div className={`${className} ${styles.CommonCard}`} style={style}>
      <a href={link}>
        <li className={styles.Card}>
          <div className={styles.left}>
            <p className={styles.name}>{data.name}</p>
            <p className={styles.detail}>{data.detail || defaultDetail}</p>
            <div className={styles.subData}>
              <LikeOutlined /> {data.praise_count}
              &nbsp; / &nbsp;
              <DislikeOutlined /> {data.tread_count}
            </div>
          </div>
          <div className={styles.cover}>
            <img src={data.cover} alt="study-route-cover" />
          </div>
        </li>
      </a>
    </div>
  );
};

export default memo(CommonCard);
