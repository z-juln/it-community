import React, { memo } from "react";
import styles from "./index.module.scss";
import type { CommonProps } from "@/@types/global";
import { StudyRoute } from "@/model";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CommonCard from "../Card/CommonCard";

export interface StudyRouteLineProps extends CommonProps {
  data: StudyRoute;
}

const StudyRouteLine: React.FC<StudyRouteLineProps> = ({
  className = "",
  style = {},
  data,
}) => {
  const isEmpty = data.nodes.length;
  return (
    <ul className={`${className} ${styles.StudyRouteLine}`} style={style}>
      <li className={styles.start}>起点</li>
      {isEmpty ?
        data.nodes.map((item, index) => (
          <div key={`${index}-${item.id}`} style={{ display: 'flex' }}>
            {index === 0 && <ArrowRightOutlined className={styles.arrow} />}
            <Link to={`/study-set/${item.id}`}>
              <CommonCard className={styles.card} data={item} />
            </Link>
            <ArrowRightOutlined className={styles.arrow} />
          </div>
        ))
        : (
        <div key='empty' style={{ display: 'flex' }}>
          <ArrowRightOutlined className={styles.arrow} />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 120, height: 160 }}>暂无数据</div>    
          <ArrowRightOutlined className={styles.arrow} />
        </div>
      )}
      <li className={styles.end}>终点</li>
    </ul>
  );
};

export default memo(StudyRouteLine);
