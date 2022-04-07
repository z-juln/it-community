import React, { memo, useMemo, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { popupLoginPanelState, userInfoState } from "@/store";
import { Avatar, Input, message } from "antd";
import {
  CommentOutlined,
  LikeOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";
import type { CommonProps } from "@/@types/global";
import { ApplyStatus, Discuss, DiscussWithChildren, SavedUserResult } from "@/model";
import CommendTree from "../CommendTree";

export interface ArticlePageProps extends CommonProps {
  title: React.ReactNode;
  commendTree: DiscussWithChildren[];
  onReply?: (content: string, topId: number) => Promise<Discuss | null>;
}

const ArticlePage: React.FC<ArticlePageProps> = ({
  className = "",
  style = {},
  title,
  children,
  commendTree,
  onReply,
}) => {
  const setPopupLoginPanel = useSetRecoilState(popupLoginPanelState);
  const userInfo = useRecoilValue(userInfoState);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [targetReplyInfo, setTargetReplyInfo] = useState<{
    userInfo: SavedUserResult;
    discussId: number;
  } | null>(null);

  const commendCount = useMemo(() => {
    return getDiscussCount(commendTree);
  }, [commendTree]);
  console.log({ commendTree, commendCount });

  return (
    <div className={`${className} ${styles.ArticlePage}`} style={style}>
      <div className={styles["article-suspended-panel"]}>
        <div className={`${styles.likeBtn} ${styles.panelBtn}`}>
          <LikeOutlined />
        </div>
        <div
          className={`${styles.commentBtn} ${styles.panelBtn}`}
          onClick={() => {
            const commentSectionHead = document.querySelector('#commentSectionHead');
            if (!commentSectionHead) {
              throw new Error('commentSectionHead不存在');
            }
            commentSectionHead.scrollIntoView();
          }}
        >
          <CommentOutlined />
        </div>
        <div
          className={`${styles.collectBtn} ${styles.panelBtn}`}
          onClick={() => message.info('功能尚未开放')}
        >
          <StarOutlined />
        </div>
      </div>

      <div className={styles.rightBody}>
        <article>
          <h2>{title}</h2>
          <div className={styles.content}>{children}</div>
        </article>

        <section className={styles.commends}>
          <h2>评论</h2>
          <div
            className={styles.commentForm}
            onClick={() => setPopupLoginPanel(true)}
          >
            <Avatar
              shape="circle"
              icon={userInfo ? undefined : <UserOutlined />}
              src={userInfo?.avatar}
              style={
                userInfo ? { color: "#f56a00", backgroundColor: "#fde3cf" } : {}
              }
            >
              {userInfo?.name.toLocaleUpperCase()}
            </Avatar>
            <Input.TextArea
              ref={textAreaRef}
              className={styles.textarea}
              size="large"
              placeholder={
                targetReplyInfo
                  ? `回复${targetReplyInfo.userInfo.name}...`
                  : "输入评论（Enter换行，⌘ + Enter发送）"
              }
              onBlurCapture={() => setTargetReplyInfo(null)}
              onKeyDownCapture={(e) => {
                if (e.metaKey && e.key === "Enter") {
                  const resultDiscuss = onReply?.(
                    e.currentTarget.value,
                    targetReplyInfo?.discussId ?? -1
                  );
                  if (resultDiscuss) {
                    setTargetReplyInfo(null);
                    e.currentTarget.blur();
                  }
                }
              }}
            />
          </div>

          <>
            <h2 id="commentSectionHead">全部评论 {commendCount}</h2>

            <ul className={styles.commendTree}>
              <CommendTree
                treeData={commendTree}
                onReplay={(userInfo, discussId) => {
                  const textArea = textAreaRef.current!;
                  textArea.focus();
                  setTargetReplyInfo({
                    userInfo,
                    discussId,
                  });
                }}
              />
            </ul>
          </>
        </section>
      </div>
    </div>
  );
};

export default memo(ArticlePage);

function getDiscussCount(treeData: DiscussWithChildren[]): number {
  return treeData.reduce((total, item) => {
    return (
      total + 1 + (item.children.length ? getDiscussCount(item.children) : 0)
    );
  }, 0);
}
