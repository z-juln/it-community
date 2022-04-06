import React, { memo, useEffect, useState } from "react";
import { Select, Input, Empty } from "antd";
import { useZoneList } from "@/store";
import * as apis from "@/apis";
import {
  DislikeOutlined,
  DownOutlined,
  FireOutlined,
  LikeOutlined,
  SearchOutlined,
  UpOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";
import type { StudyRoute, StudySet } from "@/model";
import StudyRouteCard from "@/components/Card/StudyRouteCard";
import { StudySetCard } from "@/components/Card/StudySetCard";

const { Search } = Input;

export interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const zoneList = useZoneList();
  const [currentZoneId, setCurrentZoneId] = useState(zoneList[0].id);
  const [keyword, setKeyword] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [studyRouteList, setStudyRouteList] = useState<StudyRoute[]>([]);
  const [studySetList, setStudySetList] = useState<StudySet[]>([]);
  const [showMoreStudyRoute, setShowMoreStudyRoute] = useState(false);
  const [showMoreStudySet, setShowMoreStudySet] = useState(false);

  useEffect(() => {
    setSearchLoading(true);
    apis
      .getStudyRouteList({
        keyword,
        zone_id: currentZoneId,
        pageIndex: 0,
        pageNum: 6,
      })
      .then((res) => {
        setStudyRouteList(res.data);
      });
    apis.getStudySetList({
      keyword,
      zone_id: currentZoneId,
      pageIndex: 0,
      pageNum: 6,
    }).then((res) => {
      setStudySetList(res.data);
    });
    setSearchLoading(false);
  }, [currentZoneId, keyword]);

  return (
    <div className={styles.Home}>
      <div className={styles.searchBar}>
        <Select
          className={styles.zoneSelector}
          value={currentZoneId}
          onChange={setCurrentZoneId}
        >
          {zoneList.map(({ id, name }) => (
            <Select.Option value={id}>{name}</Select.Option>
          ))}
        </Select>

        <Search
          className={styles.searchBox}
          prefix={<SearchOutlined />}
          enterButton="搜索"
          size="large"
          loading={searchLoading}
          onSearch={setKeyword}
        />
      </div>

      <h2 className={styles.title}>
        <FireOutlined />
        学习路线
        {studyRouteList.length ? (
          <div className={styles.moreBtn}>
            <span
              className={styles.text}
              onClick={() => setShowMoreStudyRoute((status) => !status)}
            >
              {showMoreStudyRoute ? (
                <>
                  收起
                  <UpOutlined />
                </>
              ) : (
                <>
                  查看更多
                  <DownOutlined />
                </>
              )}
            </span>
          </div>
        ) : null}
      </h2>

      <section
        className={`${styles.hotStudyRoute} ${
          showMoreStudyRoute ? styles.more : ""
        }`}
      >
        <ul>
          {searchLoading === false && studyRouteList.length ? (
            studyRouteList.map((data) => (
              <StudyRouteCard className={styles.Card} data={data} />
            ))
          ) : (
            <Empty
              style={{ width: "100%" }}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="暂无数据"
            />
          )}
        </ul>
      </section>

      <h2 className={styles.title}>
        <FireOutlined />
        学库
        {studySetList.length ? (
          <div className={styles.moreBtn}>
            <span
              className={styles.text}
              onClick={() => setShowMoreStudySet((status) => !status)}
            >
              {showMoreStudySet ? (
                <>
                  收起
                  <UpOutlined />
                </>
              ) : (
                <>
                  查看更多
                  <DownOutlined />
                </>
              )}
            </span>
          </div>
        ) : null}
      </h2>

      <section
        className={`${styles.hotStudySet} ${
          showMoreStudySet ? styles.more : ""
        }`}
      >
        <ul>
          {searchLoading === false && studySetList.length ? (
            studySetList.map((data) => (
              <StudySetCard className={styles.Card} data={data} />
            ))
          ) : (
            <Empty
              style={{ width: "100%" }}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="暂无数据"
            />
          )}
        </ul>
      </section>
    </div>
  );
};

export default memo(Home);
