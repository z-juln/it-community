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
import StudyRouteLine from "@/components/StudyRouteLine";

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
        contentFullMode
      >
        {studyRoute?.nodes.length ?
          <StudyRouteLine className={articleStyles.cardList} data={studyRoute} />
          : <Empty style={{ transform: "translateY(100px)" }} description='暂无数据' />
        }
      </ArticlePage>
    </div>
  );
};

export default memo(StudyRouteComp);
