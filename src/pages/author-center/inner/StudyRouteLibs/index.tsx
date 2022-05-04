import React, { memo, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store";
import * as apis from '@/apis/studyRoute';
import type { CommonProps } from "@/@types/global";
import { StudyRoute } from "@/model";
import { useNavigate } from "react-router";
import StudyRouteCard from "@/components/Card/StudyRouteCard";
import { Button, Empty } from "antd";
import { TabKey } from "../..";

export interface FormField {
  zone_id: number;
  name: string;
  cover: string;
  detail: string;
  links: string;
}

export interface StudyRouteLibsProps extends CommonProps {
  setTab?: (tab: TabKey) => void;
}

const StudyRouteLibs: React.FC<StudyRouteLibsProps> = ({
  className = "",
  style = {},
  setTab,
}) => {
  const navigate = useNavigate();
  const [studyRouteList, setStudyRouteList] = useState<StudyRoute[]>([]);
  const isEmpty = studyRouteList.length === 0;

  const userInfo = useRecoilValue(userInfoState);
  if (!userInfo) {
    throw new Error("用户信息不存在");
  }

  useEffect(() => {
    apis.getStudyRouteList({ ownId: userInfo.uid })
      .then(res => {
        setStudyRouteList(res.data);
      });
  }, []);

  return (
    <div className={`${className} ${styles.StudyRouteLibs}`} style={style}>
      <h2>
        <span>我的学习路线</span>
        <Button
          className={styles.createLink}
          type='link'
          onClick={() => setTab?.(TabKey.studyRouteCreation)}
        >
          点我创建更多学习路线
        </Button>
      </h2>
      {isEmpty ?
        <Empty description="暂无数据" />
        : (
        <ul className={styles.list}>
          {studyRouteList.map(item => (
            <StudyRouteCard className={styles.StudyRouteCard} data={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default memo(StudyRouteLibs);
