import * as apis from "@/apis";
import { Empty, message } from "antd";
import React, { memo, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import ArticlePage from "@/components/ArticlePage";
import styles from "./index.module.scss";
import type { DiscussWithChildren, StudyItem } from "@/model";
import Material from "@/components/Material";

export interface StudyItemProps {}

const StudyItemComp: React.FC<StudyItemProps> = () => {
  const id = useParams().id!;
  const [info, setInfo] = useState<StudyItem | null>(null);
  const contentNodes = JSON.parse(info?.content || "[]") ?? [];
  const [commendTreeData, setCommendTreeData] = useState<DiscussWithChildren[]>(
    []
  );

  useEffect(() => {
    apis.getStudyItemInfo(id).then((res) => {
      setInfo(res.data);
    });
    refetchDiscussList();
  }, [id]);

  function refetchDiscussList() {
    apis.getDiscussList({ super_id: +id, super_type: "item" }).then((res) => {
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
        title={`[学点]: ${info?.title || ""}`}
        commendTree={commendTreeData}
        onReply={async (content, topId) => {
          const { data: resultDiscuss } = await apis.addDiscuss({
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
