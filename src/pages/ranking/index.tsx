import { Ranking as RankingType } from "@/model";
import { userInfoState } from "@/store";
import React, { memo, useEffect, useState } from "react";
import styles from "./index.module.scss";
import * as apis from "@/apis";
import { useRecoilValue } from "recoil";

export interface RankingProps {}

const Ranking: React.FC<RankingProps> = () => {
  const meUserInfo = useRecoilValue(userInfoState);

  const [hotRanking, setHotRanking] = useState<RankingType | null>(null);
  const [providerRanking, setProviderRanking] = useState<RankingType | null>(
    null
  );

  useEffect(() => {
    apis.getRanking("hot").then(({ data }) => setHotRanking(data));
    apis.getRanking("provider").then(({ data }) => setProviderRanking(data));
  }, []);

  function getListAndMe(rankingData: RankingType | null) {
    const myIndex = (rankingData?.list ?? []).findIndex(item => item.userInfo.uid === meUserInfo?.uid);
    const hasMyRank = myIndex !== -1;
    const myRankInfo = hasMyRank ? rankingData?.list[myIndex] : null;
    return (
      <ul className={styles.innerList}>
        {rankingData?.list.map(({ userInfo, point }, index) => (
          <li key={userInfo.uid}>
            <div className={styles.rank}>{index + 1}</div>
            <div className={styles.userInfo}>{userInfo.name}</div>
            <p className={styles.point}>{point.toFixed(0)}</p>
          </li>
        ))}
        {meUserInfo ? <li className={styles.me}>
          {hasMyRank ? (
            <>
              <div className={styles.rank}>{myIndex + 1}</div>
              <div className={styles.userInfo}>我: {myRankInfo?.userInfo.name}</div>
              <p className={styles.point}>{myRankInfo?.point.toFixed(0)}</p>
            </>
          ) : '你尚未上榜'}
        </li> : null}
      </ul>
    );
  }

  return (
    <div className={styles.Ranking}>
      <div className={`${styles.list} ${styles.hotList}`}>
        <h2>活跃度排行榜</h2>
        {getListAndMe(hotRanking)}
      </div>
      <div className={`${styles.list} ${styles.providerList}`}>
        <h2>贡献者排行榜</h2>
        {getListAndMe(providerRanking)}
      </div>
    </div>
  );
};

export default memo(Ranking);
