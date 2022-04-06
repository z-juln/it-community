import React, { memo, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { Button, Form, Input, notification, Select } from "antd";
import { useRecoilState } from "recoil";
import { userInfoState } from "@/store";
import Material from "@/components/Material";
import * as zoneApis from "@/apis/zone";
import * as apis from '@/apis/studySet';
import type { CommonProps } from "@/@types/global";
import { MaterialBaseCtx } from "@/components/Material/model";
import { StudyRoute, Zone } from "@/model";
import { useNavigate } from "react-router";

export interface FormField {
  zone_id: number;
  name: string;
  cover: string;
  detail: string;
  links: string;
}

export interface StudySetCreationProps extends CommonProps {}

const StudySetCreation: React.FC<StudySetCreationProps> = ({
  className = "",
  style = {},
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm<FormField>();
  const [zoneList, setZoneList] = useState<Zone[]>([]);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [loading, setLoading] = useState(false);

  if (!userInfo) {
    throw new Error("用户信息不存在");
  }

  useEffect(() => {
    zoneApis.getZoneList().then(res => {
      setZoneList(res.data);
    });
  }, []);

  const handleSumbit = () => {
    form.validateFields()
      .then(formFileds => {
        apis
          .addStudySet(formFileds)
          .then(({ data }) => {
            if (!data) {
              notification.error({
                message: "创建学库失败",
                description: "原因未知",
                duration: 3,
              });
              return;
            }
            navigate(`/published?title=${data.name}&id=${data.id}&type=set`);
          });
      });
  };

  return (
    <div className={`${className} ${styles.StudySetCreation}`} style={style}>
      <div className={styles.container}>
        <h1>创建学库</h1>
        <Form
          form={form}
          layout='horizontal'
          initialValues={{ status: 'all' }}
        >
          <Form.Item
            name='name'
            label='学库名'
            rules={[{required: true, message: '学库名不能为空'}]}
          >
            <Input placeholder="请输入学库名" />
          </Form.Item>
          <Form.Item
            name='zone_id'
            label='所属专区'
            rules={[{required: true, message: '所属专区不能为空'}]}
          >
            <Select
              placeholder='请选择所属专区'
            >
              {zoneList.map(zone => (
                <Select.Option value={zone.id}>{zone.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          {/* cover */}
          <Form.Item
            name='detail'
            label='描述'
            rules={[{required: true, message: '描述不能为空'}]}
          >
            <Input placeholder="请输入描述" />
          </Form.Item>
          {/* links */}
        </Form>
        <Button
          className={styles.createBtn}
          type='primary'
          onClick={() => handleSumbit()}
          loading={loading}
        >
          创建
        </Button>
      </div>
    </div>
  );
};

export default memo(StudySetCreation);
