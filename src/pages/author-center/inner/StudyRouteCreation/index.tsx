import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import styles from "./index.module.scss";
import { Button, Form, Input, message, Modal, notification, Select, Space } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfoState } from "@/store";
import * as apis from '@/apis/studyRoute';
import * as zoneApis from "@/apis/zone";
import * as studySetApis from '@/apis/studySet';
import type { CommonProps } from "@/@types/global";
import { MaterialBaseCtx } from "@/components/Material/model";
import { StudySet, Zone } from "@/model";
import { useNavigate } from "react-router";
import StudyRouteLine from "@/components/StudyRouteLine";

export interface FormField {
  zone_id: number;
  name: string;
  cover: string;
  detail: string;
  links: string;
}

export interface StudyRouteCreationProps extends CommonProps {}

const StudyRouteCreation: React.FC<StudyRouteCreationProps> = ({
  className = "",
  style = {},
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm<FormField>();
  const [zoneList, setZoneList] = useState<Zone[]>([]);
  const [studySetList, setStudySetList] = useState<StudySet[]>([]);
  const [selectedSetId, setSelectedSetId] = useState<number | null>(null);
  const [nodeIds, setNodeIds] = useState<number[]>([]);
  const [nodes, setNodes] = useState<StudySet[]>([]);
  const displayStudySetList = useMemo(() => {
    return studySetList.filter(item => !nodeIds.includes(item.id));
  }, [studySetList, nodeIds]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const newNodes: StudySet[] = [];
      for await (const setId of nodeIds) {
        const { data } = await studySetApis.getStudySetInfo(setId);
        newNodes.push(data);
      }
      setNodes(newNodes);
    })();
  }, [nodeIds]);

  const userInfo = useRecoilValue(userInfoState);
  if (!userInfo) {
    throw new Error("用户信息不存在");
  }

  useEffect(() => {
    zoneApis.getZoneList().then(res => {
      setZoneList(res.data);
    });
  }, []);

  useEffect(() => {
    studySetApis.getStudySetList({ uid: userInfo.uid })
      .then(res => {
        setStudySetList(res.data);
      });
  }, []);

  function addNode() {
    if (selectedSetId) {
      setNodeIds(ids => [...ids, selectedSetId]);
      setSelectedSetId(null);
    }
  }

  function deleteNode() {
    if (nodeIds.length) {
      setNodeIds(ids => ids.slice(0, ids.length - 1));
    }
  }

  type FinallySumitParams = Parameters<typeof apis.addStudyRoute>[0];

  function finallySubmit(params: FinallySumitParams) {
    apis.addStudyRoute(params)
      .then(({ code, data }) => {
        if (code !== 1 || !data) {
          throw new Error('创建失败');
        }
        navigate(`/published?title=${data.name}&id=${data.id}&type=route`);
      })
      .catch(() => {
        message.error('创建失败, 原因未知');
      })
  }

  function handleSumbit() {
    form.validateFields()
      .then(values => {
        const params: FinallySumitParams = {
          ...values,
          nodes: JSON.stringify(nodeIds),
        };
        if (nodeIds.length === 0) {
          Modal.confirm({
            title: '',
            content: '你尚未添加节点，是否继续创建?',
            maskClosable: false,
            onOk() {
              finallySubmit(params);
            },
          })
        } else {
          finallySubmit(params);
        }
      });
  }

  return (
    <div className={`${className} ${styles.StudyRouteCreation}`} style={style}>

      <div className={styles.container}>
        <h1>创建学习路线</h1>

        <Form
          className={styles.Form}
          form={form}
          layout='horizontal'
        >
          <Form.Item
            name='name'
            label='学习路线名'
            rules={[{required: true, message: '学习路线名不能为空'}]}
          >
            <Input placeholder="请输入学习路线名" />
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

        <section className={styles.contenBox}>
          <h3>内容节点: </h3>
          <hr />
          <StudyRouteLine
            className={styles.StudyRouteLine}
            data={{ nodes } as any}
          />
          <hr />
          <Space size={20}>
            <span>操作: </span>
            <Select
              placeholder='请选择学库'
              value={selectedSetId}
              onChange={setSelectedSetId}
            >
              {displayStudySetList.map(set => (
                <Select.Option value={set.id}>{set.name}</Select.Option>
              ))}
            </Select>
            <Button onClick={addNode}>添加</Button>
            <Button onClick={deleteNode}>删除上一个节点</Button>
          </Space>
        </section>

        <Button
          className={styles.createBtn}
          type='primary'
          onClick={handleSumbit}
          loading={loading}
        >
          创建
        </Button>
      </div>
    </div>
  );
};

export default memo(StudyRouteCreation);
