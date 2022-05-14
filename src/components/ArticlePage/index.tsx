import React, { memo, useMemo, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { popupLoginPanelState, userInfoState } from "@/store";
import { Avatar, Badge, Input, message } from "antd";
import {
  CommentOutlined,
  LikeOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";
import type { CommonProps } from "@/@types/global";
import { Discuss, DiscussWithChildren, SavedUserResult } from "@/model";
import CommendTree from "../CommendTree";

export interface ArticlePageProps extends CommonProps {
  title: React.ReactNode;
  commendTree: DiscussWithChildren[];
  onReply?: (content: string, topId: number) => Promise<Discuss | null>;
  contentFullMode?: boolean;
}

const ArticlePage: React.FC<ArticlePageProps> = ({
  className = "",
  style = {},
  title,
  children,
  commendTree,
  onReply,
  contentFullMode = false,
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
    <div
      id="ArticlePage"
      className={`
        ${className}
        ${styles.ArticlePage}
        ${contentFullMode ? styles.contentFullMode : ''}
      `}
      style={style}
    >
      {!contentFullMode && (
        <div className={styles["article-suspended-panel"]}>
          <div className={`${styles.likeBtn} ${styles.panelBtn}`}>
            <LikeOutlined />
          </div>
          <div
            className={`${styles.commentBtn} ${styles.panelBtn}`}
            onClick={() => {
              const commentSectionHead = document.querySelector<HTMLDivElement>('#commentSectionHead');
              const scrollWrapper = document.querySelector<HTMLDivElement>('html')!;
              if (!commentSectionHead) {
                throw new Error('commentSectionHead不存在');
              }
              if (!scrollWrapper) {
                throw new Error('scrollWrapper不存在');
              }
              scrollWrapper.scrollTop = commentSectionHead.offsetTop - 60;
            }}
          >
            <Badge count={commendCount} size='small'>
              <CommentOutlined />
            </Badge>
          </div>
          <div
            className={`${styles.collectBtn} ${styles.panelBtn}`}
            onClick={() => message.info('功能尚未开放')}
          >
            <StarOutlined />
          </div>
        </div>
      )}

      <div className={styles.rightBody}>
        <article>
          <h2>{title}</h2>
          <div className={styles.content}>{children}</div>
        </article>

        {!contentFullMode && (
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
                onKeyDownCapture={async (e) => {
                  const { currentTarget } = e;
                  if (e.metaKey && e.key === "Enter") {
                    const resultDiscuss = await onReply?.(
                      currentTarget.value,
                      targetReplyInfo?.discussId ?? -1
                    );
                    if (resultDiscuss) {
                      setTargetReplyInfo(null);
                      currentTarget.blur();
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
        )}
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
