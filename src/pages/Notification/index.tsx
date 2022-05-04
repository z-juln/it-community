import React, { memo, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import NotificationComp from "@/components/Notification";
import { notificationState, userInfoState } from "@/store";
import { Badge, Empty, Menu, message } from "antd";
import styles from "./index.module.scss";
import apis from '@/apis/notification';
import { Notification as NotificationType } from "@/model";

export interface NotificationPageProps {}

const NotificationPage: React.FC<NotificationPageProps> = () => {
  const [notificationStateValue, setNotificationState] = useRecoilState(notificationState);
  const [currentTab, setCurrentTab] = useState<'discuss' | 'praise' | 'system'>("discuss");

  const notificationList = useMemo(() => {
    const list = notificationStateValue.list.map(item => ({
      ...item,
      meta: JSON.parse((item.meta ?? '{}')),
    })).reverse();
    return list;
  }, [notificationStateValue.list]);
  const currentList = useMemo(() => {
    switch (currentTab) {
      case 'discuss':
        return notificationList.filter(item => ['top-discuss', 'reply-discuss'].includes(item.type));
      case 'praise':
        return notificationList.filter(item => item.type === 'praise');
      case 'system':
        return notificationList.filter(item => ['provider_apply', 'study_item_apply'].includes(item.type));
    }
  }, [currentTab, notificationList]);
  const empty = currentList.length === 0;

  function getUnReadCountByTypes(types: NotificationType['type'][]) {
    return notificationList.reduce((total, item) => {
      if (types.includes(item.type)) {
        return total + item.readed ? 0 : 1;
      }
      return total;
    }, 0);
  }

  return (
    <div className={styles.NotificationPage}>
      <Menu
        className={styles.Menu}
        selectedKeys={[currentTab]}
        onClick={({ key: tabKey }) => setCurrentTab(tabKey as any)}
        mode="horizontal"
      >
        <Menu.Item key="discuss">
          <Badge count={getUnReadCountByTypes(['top-discuss', 'reply-discuss'])} size='small'>评论消息</Badge>
        </Menu.Item>
        <Menu.Item key="praise">
          <Badge count={getUnReadCountByTypes(['praise'])} size='small'>点赞消息</Badge>
        </Menu.Item>
        <Menu.Item key="system">
          <Badge count={getUnReadCountByTypes(['provider_apply', 'study_item_apply'])} size='small'>系统消息</Badge>
        </Menu.Item>
      </Menu>

      <section className={styles.body}>
        {empty
          ? <Empty description='暂无通知' />
          : currentList.map(item => <NotificationComp key={item.id} data={item} />)
        }
      </section>
    </div>
  );
};

export default memo(NotificationPage);
