import * as apis from "@/apis";
import StudyItemCard from "@/components/Card/StudyItemCard";
import { Empty } from "antd";
import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router";
import ArticlePage from "@/components/ArticlePage";
import articleStyles from "@/components/ArticlePage/index.module.scss";
import styles from "./index.module.scss";
import type { StudyItem, StudySet } from "@/model";
import { Link } from "react-router-dom";

export interface StudySetProps {}

const StudySetComp: React.FC<StudySetProps> = () => {
  const setId = useParams().id!;
  const [info, setInfo] = useState<StudySet | null>(null);
  const [items, setItems] = useState<StudyItem[]>([]);

  useEffect(() => {
    apis.getStudySetInfo(setId).then((res) => {
      setInfo(res.data);
    });
    apis.getItemsOfStudySet(setId).then((res) => {
      setItems(res.data);
    });
  }, [setId]);

  return (
    <div className={styles.StudySet}>
      <ArticlePage
        title={`[学库]: ${info?.name || ""}`}
        commendTree={[]}
        contentFullMode
      >
        {items.length ? (
          <ul className={articleStyles.cardList}>
            {items.map((item) => (
              <Link to={`/study-item/${item.id}`}>
                <StudyItemCard data={item} />
              </Link>
            ))}
          </ul>
        ) : (
          <Empty style={{ transform: "translateY(100px)" }} description='暂无数据' />
        )}
      </ArticlePage>
    </div>
  );
};

export default memo(StudySetComp);
