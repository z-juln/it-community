import NotificationComp from "@/components/Notification";
import { Empty, Menu, message } from "antd";
import React, { memo, useEffect, useMemo, useState } from "react";
import styles from "./index.module.scss";
import { Notification as NotificationType } from '@/model';
import apis from '@/apis/notification';

export interface NotificationPageProps {}

const NotificationPage: React.FC<NotificationPageProps> = () => {
  const [currentTab, setCurrentTab] = useState<'discuss' | 'praise' | 'system'>("discuss");
  const [notificationList, setNotificationList] = useState<NotificationType[]>([]);
  const currentList = useMemo(() => {
    switch (currentTab) {
      case 'discuss':
        return notificationList.filter(item => item.type === 'discuss');
      case 'praise':
        return notificationList.filter(item => item.type === 'praise');
      case 'system':
        return notificationList.filter(item => ['provider_apply', 'study_item_apply'].includes(item.type));
    }
  }, [currentTab, notificationList]);
  const empty = currentList.length === 0;

  useEffect(() => {
    apis.getNotificationList()
      .then(res => {
        if (res.code !== 1) {
          throw new Error(res.message);
        }
        const list = res.data.map(item => ({
          ...item,
          meta: JSON.parse((item.meta ?? '{}')),
        }));
        setNotificationList(list);
      })
      .catch((error) => {
        message.error(error);
      });
  }, []);
  console.log({currentList});

  return (
    <div className={styles.NotificationPage}>
      <Menu
        className={styles.Menu}
        selectedKeys={[currentTab]}
        onClick={({ key: tabKey }) => setCurrentTab(tabKey as any)}
        mode="horizontal"
      >
        <Menu.Item key="discuss">
          评论消息
        </Menu.Item>
        <Menu.Item key="praise">
          点赞消息
        </Menu.Item>
        <Menu.Item key="system">
          系统消息
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
