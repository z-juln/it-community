import React, { memo, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Button, Empty } from "antd";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store";
import * as apis from '@/apis/studySet';
import type { CommonProps } from "@/@types/global";
import { StudySet } from "@/model";
import { useNavigate } from "react-router";
import StudySetCard from "@/components/Card/StudySetCard";
import { TabKey } from "../..";

export interface FormField {
  zone_id: number;
  name: string;
  cover: string;
  detail: string;
  links: string;
}

export interface StudySetCreationProps extends CommonProps {
  setTab?: (tab: TabKey) => void;
}

const StudySetLibs: React.FC<StudySetCreationProps> = ({
  className = "",
  style = {},
  setTab,
}) => {
  const navigate = useNavigate();
  const [studySetList, setStudySetList] = useState<StudySet[]>([]);
  const isEmpty = studySetList.length === 0;

  const userInfo = useRecoilValue(userInfoState);
  if (!userInfo) {
    throw new Error("用户信息不存在");
  }

  useEffect(() => {
    apis.getStudySetList({ uid: userInfo.uid })
      .then(res => {
        setStudySetList(res.data);
      })
  }, []);

  return (
    <div className={`${className} ${styles.StudySetLibs}`} style={style}>
      <h2>
        <span>我的学库</span>
        <Button
          className={styles.createLink}
          type='link'
          onClick={() => setTab?.(TabKey.studySetCreation)}
        >
          点我创建更多学库
        </Button>
      </h2>
      {isEmpty ?
        <Empty description="暂无数据" />
        : (
        <ul className={styles.list}>
          {studySetList.map(info => (
            <StudySetCard className={styles.StudySetCard} data={info} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default memo(StudySetLibs);
