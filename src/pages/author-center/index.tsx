import React, { memo, useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { Button, Menu } from "antd";
import { Apply as ApplyType, User, UserRole } from "@/model";
import Apply from "./inner/apply";
import { userInfoState } from "@/store";
import styles from "./index.module.scss";
import StudySetCreation from "./inner/StudySetCreation";
import StudyItemCreation from "./inner/StudyItemCreation";
import StudySetLibs from "./inner/StudySetLibs";
import StudyRouteLibs from "./inner/StudyRouteLibs";
import StudyRouteCreation from "./inner/StudyRouteCreation";
import * as apis from '@/apis/provider';

function checkAuth(role: User["role"]) {
  return [UserRole.ADMIN, UserRole.PROVIDER].includes(role);
}

export enum TabKey {
  studyRouteLibs = "studyRouteLibs",
  studySetLibs = "studySetLibs",
  studyRouteCreation = "studyRouteCreation",
  studySetCreation = "studySetCreation",
  studyItemCreation = "studyItemCreation",
}

export interface AuthorCenterProps {}

const AuthorCenter: React.FC<AuthorCenterProps> = () => {
  const [showApplyPage, setShowApplyPage] = useState(false);
  const [tab, setTab] = useState(TabKey.studyRouteLibs);
  const userInfo = useRecoilValue(userInfoState);
  const [applyStatus, setApplyStatus] = useState<ApplyType['status'] | null>(null);


  if (!userInfo) {
    throw new Error("用户信息获取不到");
  }

  const hasAuth = useMemo(() => {
    // 申请通过后，如果不重新登陆, userInfo.role不会更新，只能通过applyStatus判断
    return checkAuth(userInfo.role) || applyStatus === 'pass';
  }, [userInfo, applyStatus]);

  useEffect(() => {
    apis.getApplyStatus()
      .then(({ data, code }) => {
        if (code !== 1 || !data) {
          // throw new Error('获取申请状态失败');
          return;
        }
        setApplyStatus(data.status);
      })
      .catch(() => {
        // message.error('获取申请状态失败');
      });
  }, []);

  if (showApplyPage) {
    return (
      <Apply
        onApply={() => {
          setShowApplyPage(false);
          window.location.reload();
        }}
      />
    );
  }

  if (!hasAuth) {
    return (
      <section className={styles.apply}>
        <h2>
          {applyStatus === 'waitting' ? (
            '审核中... 等待管理员通过'
          ) : (
            <>
              你还不是贡献者
              <Button type="link" onClick={() => setShowApplyPage(true)}>
                点我申请成为贡献者
              </Button>
            </>
          )}
        </h2>
      </section>
    );
  }

  const mainElement = (() => {
    switch (tab) {
      case TabKey.studyRouteLibs:
        return <StudyRouteLibs setTab={setTab} />;
      case TabKey.studySetLibs:
        return <StudySetLibs setTab={setTab} />;
      case TabKey.studyRouteCreation:
        return <StudyRouteCreation />;
      case TabKey.studySetCreation:
        return <StudySetCreation />;
      case TabKey.studyItemCreation:
        return <StudyItemCreation />;
    }
  })();

  return (
    <div className={styles.AuthorCenter} key="AuthorCenter">
      <Menu
        onClick={(e) => setTab(e.key as TabKey)}
        selectedKeys={[tab]}
        mode="horizontal"
      >
        <Menu.SubMenu key="libs" title="我的资源">
          <Menu.Item key="studyRouteLibs">学习路线</Menu.Item>
          <Menu.Item key="studySetLibs">学库</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="add" title="新建">
          <Menu.Item key="studyRouteCreation">学习路线</Menu.Item>
          <Menu.Item key="studySetCreation">学库</Menu.Item>
          <Menu.Item key="studyItemCreation">学点</Menu.Item>
        </Menu.SubMenu>
      </Menu>

      <div className={styles.main}>{mainElement}</div>
    </div>
  );
};

export default memo(AuthorCenter);
