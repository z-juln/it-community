// TODO ui, valid
import React, { memo, useState } from "react";
import { useRecoilState } from "recoil";
import { Modal, Button, Form, Input, Space, message } from "antd";
import { userInfoState } from "@/store";
import styles from "./index.module.scss";
import * as api from "@/apis";

enum Tab {
  LOGIN,
  REGISTER,
}

export interface Fileds {
  name: string;
  password: string;
}

export interface UserModalProps {
  visible: boolean;
  onCancel: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const UserModal: React.FC<UserModalProps> = ({
  visible,
  onCancel: handleCancel,
}) => {
  const [, setUserInfo] = useRecoilState(userInfoState);

  const [form] = Form.useForm<Fileds>();
  const [tab, setTab] = useState(Tab.LOGIN);
  const isLogining = tab === Tab.LOGIN;
  const tabLabel = isLogining ? "登录" : "注册";
  const toggleTab = () =>
    setTab((tab) => (tab === Tab.LOGIN ? Tab.REGISTER : Tab.LOGIN));

  const handleFinish = ({ name, password }: Fileds) => {
    const apiAction = isLogining ? api.login : api.register;
    apiAction(name, password)
      .then(({ data, code }) => {
        if (code !== 1) {
          throw new Error(`${tabLabel}失败`);
        }
        message.success(`${tabLabel}成功`);
        setUserInfo(data);
      })
      .catch(() => {
        message.error(`${tabLabel}失败`);
      });
  };

  return (
    <div className={styles.UserModal}>
      <Modal
        title={tabLabel}
        visible={visible}
        footer={null}
        onCancel={handleCancel}
        // modalRender={(modal) => {
        //   return <>{modal}</>;
        // }}
      >
        <Form form={form} name="control-hooks" onFinish={handleFinish}>
          <Form.Item
            name="name"
            label="用户名"
            rules={[{ required: true, message: "用户名未填写" }, {}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: "密码未填写" }, {}]}
          >
            <Input type='password' />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button htmlType="submit">{tabLabel}</Button>
              <Button type="link" onClick={toggleTab}>
                {tab === Tab.LOGIN
                  ? "还没有账号?点击注册"
                  : "已有账号?点击登录"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default memo(UserModal);
