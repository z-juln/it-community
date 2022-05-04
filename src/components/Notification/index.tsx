import React, { memo, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import type { CommonProps } from "@/@types/global";
import Notification from "@/model/notification";
import { Link } from "react-router-dom";
import { getPlainTime } from "@/utils";
import apis from '@/apis/notification';
import { useReset as useNotificationReset } from "@/pages/Notification/utils";
import { useSetRecoilState } from "recoil";
import { notificationState } from "@/store";

export interface NotificationProps extends CommonProps {
  data: Notification;
  onRead?: () => void;
}

const NotificationComp: React.FC<NotificationProps> = ({
  className = "",
  style = {},
  data,
  onRead,
}) => {
  const { id, type, time, meta = null, readed: initReaded } = data;

  const setNotificationState = useSetRecoilState(notificationState);
  const [readed, setReaded] = useState(initReaded);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (readed === 0 && containerRef.current) {
      observer = new IntersectionObserver(() => {
        const timer = setTimeout(() => {
          apis.readNotificationList(id)
            .then(res => {
              if (res.code === 1 && res.data) {
                setReaded(1);
                onRead?.();
                window.location.reload();
              }
            });
          clearTimeout(timer);
        }, 500);
      });
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [containerRef.current]);

  let content: React.ReactNode;
  let logo: React.ReactNode = null;

  switch (type) {
    case 'provider_apply':
      logo = SystemLogo;
      content = (
        <span>
          【系统通知】贡献者审核已通过，请进入
          &nbsp;
          <Link to="/author-center">贡献者中心</Link>
          &nbsp;
          开始你的贡献吧
        </span>
      );
      break;
    case 'study_item_apply':
      logo = SystemLogo;
      content = (
        <span>
          【系统通知】学点
          &nbsp;
          <Link to={`/study-item/${data.target_id}`}>{meta.target_name}</Link>
          &nbsp;
          已通过审核
        </span>
      );
      break;
    case 'praise':
      content = (
        <span>
          {meta.originName}赞了你的学点
          &nbsp;
          <Link to={`/study-item/${data.target_id}`}>{meta.target_name}</Link>
        </span>
      );
      break;
    case 'top-discuss':
      content = (
        <span>
          你的学点
          &nbsp;
          <Link to={`/study-item/${data.target_id}`}>{meta.title}</Link>
          &nbsp;
          收到了一条来自【{meta.target_name}】的评论
        </span>
      );
      break;
    case 'reply-discuss':
      content = (
        <span>
          你在学点【{meta.title}】中的评论收到了一条来自【{meta.target_name}】的回复: {meta.content}          
        </span>
      );
      break;
    default:
      throw new Error(`Notification 类型 ${type} 不存在`);
  }

  return (
    <div
      className={`${className} ${styles.Notification} ${readed ? styles.readed : styles.unReaded}`}
      style={style}
      ref={containerRef}
    >
      {logo}
      <div className={styles.right}>
        {content}
        <span className={styles.time}>{getPlainTime(time)}</span>
      </div>
    </div>
  );
};

const SystemLogo = (
  <div className={styles.logo}>
    <img src="/logo.png" alt="" />
  </div>
);

export default memo(NotificationComp);
