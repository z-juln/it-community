import React, { memo, useCallback, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import NotificationComp from "@/components/Notification";
import { notificationState } from "@/store";
import { Badge, Empty, Menu } from "antd";
import styles from "./index.module.scss";
import useUrlState from '@ahooksjs/use-url-state';
import { Notification as NotificationType } from "@/model";

export type Tab = 'discuss' | 'praise' | 'system';

export interface NotificationPageProps {}

const NotificationPage: React.FC<NotificationPageProps> = () => {
  const notificationStateValue = useRecoilValue(notificationState);
  const [query, setQuery] = useUrlState({ tab: "discuss" });
  const currentTab = query.tab as Tab;
  const setCurrentTab = (tab: Tab) => setQuery({ tab });

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

  const getUnReadCountByTypes = useCallback((types: NotificationType['type'][]) => {
    return notificationList
      .filter(item => types.includes(item.type) && item.readed == 0)
      .length
  }, [notificationList]);

  const discussUnReadCount = useMemo(() =>
    getUnReadCountByTypes(['top-discuss', 'reply-discuss']),
    [getUnReadCountByTypes]
  );

  const praiseUnReadCount = useMemo(() =>
    getUnReadCountByTypes(['praise']),
    [getUnReadCountByTypes]
  );

  const systemUnReadCount = useMemo(() =>
    getUnReadCountByTypes(['provider_apply', 'study_item_apply']),
    [getUnReadCountByTypes]
  );

  return (
    <div className={styles.NotificationPage}>
      <Menu
        className={styles.Menu}
        selectedKeys={[currentTab]}
        onClick={({ key: tabKey }) => setCurrentTab(tabKey as any)}
        mode="horizontal"
      >
        <Menu.Item key="discuss">
          <Badge count={discussUnReadCount} size='small'>评论消息</Badge>
        </Menu.Item>
        <Menu.Item key="praise">
          <Badge count={praiseUnReadCount} size='small'>点赞消息</Badge>
        </Menu.Item>
        <Menu.Item key="system">
          <Badge count={systemUnReadCount} size='small'>系统消息</Badge>
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
