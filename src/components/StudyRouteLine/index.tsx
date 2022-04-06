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
  return (
    <ul className={`${className} ${styles.StudyRouteLine}`} style={style}>
      <li className={styles.start}>起点</li>
      {data.nodes.map((item, index) => (
        <>
          {index === 0 && <ArrowRightOutlined className={styles.arrow} />}
          <Link to={`/study-set/${item.id}`}>
            <CommonCard className={styles.card} data={item} />
          </Link>
          <ArrowRightOutlined className={styles.arrow} />
        </>
      ))}
      <li className={styles.end}>终点</li>
    </ul>
  );
};

export default memo(StudyRouteLine);
