import * as apis from "@/apis/studyItem";
import * as discussApis from "@/apis/discuss";
import { Empty, message } from "antd";
import React, { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ArticlePage from "@/components/ArticlePage";
import styles from "./index.module.scss";
import type { Apply, DiscussWithChildren, StudyItem } from "@/model";
import Material from "@/components/Material";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store";

export interface StudyItemProps {}

const StudyItemComp: React.FC<StudyItemProps> = () => {
  const navigate = useNavigate();
  const id = useParams().id!;
  const userInfo = useRecoilValue(userInfoState);
  const [info, setInfo] = useState<StudyItem | null>(null);
  const contentNodes = JSON.parse(info?.content || "[]") ?? [];
  const [commendTreeData, setCommendTreeData] = useState<DiscussWithChildren[]>(
    []
  );
  const [applyStatus, setApplyStatus] = useState<Apply['status'] | null>(null);

  useEffect(() => {
    apis.getStudyItemInfo(id).then(({ data }) => {
      if (data === null) {
        message.error('该学点不存在');
        navigate('/404');
      } else {
        setInfo(data);
      }
    });
    apis.getApplyList({ target_id: +id })
      .then(({ data }) => {
        setApplyStatus(data[0].status);
      });
    refetchDiscussList();
  }, [id]);

  // 如果文章处于审核中，且当前登陆用户不是文章的作者，则跳转404
  useEffect(() => {
    if (applyStatus === 'pass') return;
    if (!info || !applyStatus) return;
    // console.log({ info, userInfo, applyStatus });
    const isPrivatelyVisible = userInfo && info.uid === userInfo.uid && applyStatus === 'waitting'; // 自己可见
    const isAdmin = location.search.includes('role=admin');
    if (!isPrivatelyVisible && !isAdmin) {
      message.error('当前学点正在审核中，除作者和管理员外用户皆无权访问');
      navigate('/404');
    }
  }, [info, applyStatus]);

  function refetchDiscussList() {
    discussApis.getDiscussList({ super_id: +id, super_type: "item" }).then((res) => {
      setCommendTreeData(res.data);
    });
  }

  const articleContent = contentNodes.map((node: any) => {
    if (node.$$typeof === "HOST" && typeof node.content === "string") {
      return <div dangerouslySetInnerHTML={{ __html: node.content }}></div>;
    } else if (typeof node.content !== "string") {
      return (
        <div contentEditable={false} data-material-key={node.key ?? false}>
          <Material initCtx={node.content} />
        </div>
      );
    }
  });

  return (
    <div className={styles.StudyItem}>
      <ArticlePage
        title={(
          <>
            <span>[学点]: {info?.title || ""}</span>
            {applyStatus === 'waitting' &&
              <span className={styles.applyingBox}>审核中...</span>
            }
          </>
        )}
        commendTree={commendTreeData}
        onReply={async (content, topId) => {
          const { data: resultDiscuss } = await discussApis.addDiscuss({
            topId,
            content,
            super_id: +id,
            super_type: "item",
          });
          if (resultDiscuss) {
            refetchDiscussList();
            return resultDiscuss;
          }
          message.error("评论失败");
          return null;
        }}
      >
        {info ? (
          <>{articleContent}</>
        ) : (
          <Empty style={{ transform: "translateY(100px)" }} />
        )}
      </ArticlePage>
    </div>
  );
};

export default memo(StudyItemComp);
