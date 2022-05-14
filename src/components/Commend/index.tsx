import React, { memo } from "react";
import { Avatar, message } from "antd";
import { DiscussWithChildren, SavedUserResult } from "@/model";
import { CommentOutlined, LikeOutlined } from "@ant-design/icons";
import { getPlainTime } from "@/utils";
import styles from "./index.module.scss";
import type { CommonProps } from "@/@types/global";

export interface CommendProps
  extends CommonProps,
    Pick<
      DiscussWithChildren,
      "userInfo" | "content" | "create_time" | "praise_count" | "tread_count"
    > {
  id?: number;
  onReplay?: (userInfo: SavedUserResult, discussId: number) => void;
}

const Commend: React.FC<CommendProps> = ({
  className = "",
  style = {},
  children,
  id = -1,
  userInfo,
  content,
  create_time,
  praise_count,
  tread_count,
  onReplay,
}) => {
  return (
    <div className={`${className} ${styles.Commend}`} style={style}>
      <Avatar
        className={styles.avatar}
        shape="circle"
        src={userInfo.avatar}
        style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
      >
        {userInfo.name.toLocaleUpperCase()}
      </Avatar>
      <div className={styles.right}>
        <div className={styles.userBox}>
          <p className={styles.name}>{userInfo.name}</p>
          <time>{getPlainTime(create_time)}</time>
        </div>
        <pre className={styles.content}>{content}</pre>
        <div className={styles.actionBox}>
          <span
            className={styles.actionItem}
            onClick={() => message.info('功能尚未开放')}
          >
            <LikeOutlined /> {praise_count}
          </span>
          <span
            className={styles.actionItem}
            onClickCapture={() => onReplay?.(userInfo, id)}
          >
            <CommentOutlined /> {tread_count || "回复"}
          </span>
        </div>
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
};

export default memo(Commend);
