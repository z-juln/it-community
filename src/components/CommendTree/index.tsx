import React, { memo } from "react";
import styles from "./index.module.scss";
import type { CommonProps } from "@/@types/global";
import { DiscussWithChildren } from "@/model";
import Commend, { CommendProps } from "../Commend";

export interface CommendTreeProps extends CommonProps {
  treeData: DiscussWithChildren[];
  onReplay?: CommendProps["onReplay"];
}

const CommendTree: React.FC<CommendTreeProps> = ({
  className = "",
  style = {},
  treeData,
  onReplay,
}) => {
  return (
    <div className={`${className} ${styles.CommendTree}`} style={style}>
      {treeData.map((commend) => (
        <Commend
          className={styles.commend}
          id={commend.id}
          userInfo={commend.userInfo}
          content={commend.content}
          create_time={commend.create_time}
          praise_count={commend.praise_count}
          tread_count={commend.tread_count}
          onReplay={onReplay}
        >
          {commend.children.length ? (
            <CommendTree treeData={commend.children} onReplay={onReplay} />
          ) : null}
        </Commend>
      ))}
    </div>
  );
};

export default memo(CommendTree);
