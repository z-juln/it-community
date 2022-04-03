import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router";
import * as apis from "@/apis";
import styles from "./index.module.scss";
import type { StudyRoute } from "@/model";
import ArticlePage from "@/components/ArticlePage";
import articleStyles from "@/components/ArticlePage/index.module.scss";
import { Empty } from "antd";
import CommonCard from "@/components/Card/CommonCard";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export interface StudyRouteProps {}

const StudyRouteComp: React.FC<StudyRouteProps> = () => {
  const routeId = useParams().id!;
  const [studyRoute, setStudyRoute] = useState<StudyRoute | null>(null);

  useEffect(() => {
    apis.getStudyRoute({ id: +routeId }).then(({ data }) => {
      setStudyRoute(data);
    });
  }, []);

  return (
    <div className={styles.StudyRoute}>
      <ArticlePage
        title={`[学习路线]: ${studyRoute?.name || ""}`}
        commendTree={[]}
      >
        {studyRoute?.nodes.length ? (
          <ul className={articleStyles.cardList}>
            <li className={styles.start}>起点</li>
            {studyRoute.nodes.map((item, index) => (
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
        ) : (
          <Empty style={{ transform: "translateY(100px)" }} />
        )}
      </ArticlePage>
    </div>
  );
};

export default memo(StudyRouteComp);
