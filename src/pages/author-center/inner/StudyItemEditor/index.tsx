import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import styles from "./index.module.scss";
import { Button, Input, message, notification, Select } from "antd";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store";
import Material from "@/components/Material";
import * as apis from "@/apis";
import * as studySetApis from "@/apis/studySet";
import type { CommonProps } from "@/@types/global";
import { MaterialBaseCtx } from "@/components/Material/model";
import MaterialSelector from "@/components/MaterialSelector";
import { StudySet } from "@/model";
import { useNavigate, useParams } from "react-router";

export interface StudyItemEditorProps extends CommonProps {}

enum DisplayMode {
  editing = "editing",
  preview = "preview",
}
type ArticleNode = {
  key?: any;
  $$typeof: string;
  content: string | MaterialBaseCtx;
};
const createHostArticleNode = (innerHtml: string) => ({
  $$typeof: "HOST",
  content: innerHtml
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/'/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\t/g, '\\t')
    .replace(/\r/g, '\\r')
    .replaceAll('\b', '\\b'),
});
const initRow: ArticleNode = {
  $$typeof: "HOST",
  content: "写点什么吧...",
};
const br: ArticleNode = {
  $$typeof: "HOST",
  content: "<br />",
};

const StudyItemEditor: React.FC<StudyItemEditorProps> = ({
  className = "",
  style = {},
}) => {
  // 创建/编辑模式
  const mode = location.href.includes('edit') ? 'edit' : 'creation';
  const { id: editId } = useParams();

  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoState);
  const [visibleOfTemplateModal, setVisibleOfTemplateModal] = useState(false);

  if (!userInfo) {
    throw new Error("用户信息不存在");
  }

  const [title, setTitle] = useState("");
  const [studySetList, setStudySetList] = useState<StudySet[]>([]);
  const [selectedStudySetId, setSelectedStudySetId] = useState<
    number | null
  >(null);
  const articleRef = useRef<HTMLElement>(null);
  const [displayMode, setDisplayMode] = useState(DisplayMode.editing);

  useEffect(() => {
    if (mode !== 'edit' || !editId) return;
    apis.getStudyItemInfo(editId)
      .then(({ data }) => {
        const { content, set, title, uid } = data;
        const { id: set_id } = set;
        if (uid !== userInfo.uid && !location.search.includes('admin')) {
          message.error('你没有编辑权限');
          navigate('/404');
          return;
        }
        setTempContentNodes(JSON.parse(content));
        setTitle(title);
        setSelectedStudySetId(set_id);
      })
  }, [mode, editId]);

  useEffect(() => {
    studySetApis
      .getStudySetList({
        uid: userInfo.uid,
      })
      .then(({ data }) => {
        setStudySetList(data);
      });
  }, [userInfo]);

  const [tempContentNodes, setTempContentNodes] = useState<ArticleNode[]>([
    initRow,
  ]);
  const finnalyTempContentNodes = useRef<ArticleNode[]>(tempContentNodes);

  useEffect(() => {
    finnalyTempContentNodes.current = tempContentNodes;
  }, [tempContentNodes]);
  
  const articleContent = useMemo(() => {
    return tempContentNodes.map((node, index) => {
      if (node.$$typeof === "HOST" && typeof node.content === "string") {
        return <div dangerouslySetInnerHTML={{ __html: node.content }}></div>;
      } else if (typeof node.content !== "string") {
        return (
          <div contentEditable={false} data-material-key={node.key ?? false}>
            <Material
              initCtx={node.content}
              showTemplateCtxBox={displayMode === DisplayMode.editing}
              onChange={(newCtx) => {
                const targetNode = finnalyTempContentNodes.current[index];
                targetNode.content = JSON.stringify(newCtx, null, 2);
              }}
            />
          </div>
        );
      }
    });
  }, [tempContentNodes, setTempContentNodes, displayMode]);

  const handleSelect = (ctx: MaterialBaseCtx) => {
    setTempContentNodes((content) => [
      ...content,
      br,
      {
        key: `${Date.now()}`,
        $$typeof: "Material",
        content: ctx,
      },
      br,
    ]);
  };

  const getSubmitData = () => {
    const splitStr = "--@it@--";
    const articleNativeElement = articleRef.current;
    if (!articleNativeElement) {
      throw new Error("找不到 articleNativeElement");
    }
    const shadowArticle = document.createElement("article");
    shadowArticle.innerHTML = articleNativeElement.innerHTML;
    const meterialNativeElements = Array.from(
      shadowArticle.querySelectorAll("[data-material-key]")
    );
    meterialNativeElements.forEach(
      (el) =>
        (el.outerHTML = `${splitStr}--@material-key@--:${el.getAttribute(
          "data-material-key"
        )}${splitStr}`)
    );
    const result = shadowArticle.innerHTML
      .split(splitStr)
      .map((htmlStrOrKey) => {
        if (htmlStrOrKey.match(/--@material-key@--:.*?/)) {
          const key = htmlStrOrKey.split("--@material-key@--:")[1];
          console.log({ key });
          return tempContentNodes.find((tempNode) => tempNode.key === key);
        } else {
          return createHostArticleNode(htmlStrOrKey);
        }
      });
    return result;
  };

  const handleSumbit = () => {
    if (!selectedStudySetId || !title) {
      notification.error({
        message: "提交失败",
        description: !selectedStudySetId ? "归属学库未选择" : "请填写标题",
        duration: 3,
      });
      return;
    }

    const data = getSubmitData();
    const dataStr = JSON.stringify(data);
    console.log({ content: data[0]?.content });
    apis
      .postArticle({
        setId: selectedStudySetId,
        content: dataStr,
        detail: "",
        title,
        articleId: (mode === 'edit' && editId) ? +editId : -1,
      })
      .then(({ data }) => {
        if (!data) {
          notification.error({
            message: "文章发布失败",
            description: "原因未知",
            duration: 3,
          });
          return;
        }
        navigate(`/published?title=${title}&id=${data.articleId}`);
      });
  };

  return (
    <div className={`${className} ${styles.StudyItemEditor}`} style={style}>
      <div className={`${styles.editLine} StudyItemEditor-editLine`}>
        <Button
          className={styles.addTemplateBtn}
          onClick={() => setVisibleOfTemplateModal(true)}
        >
          添加模板
        </Button>
      </div>

      <article contentEditable ref={articleRef}>
        {articleContent}
      </article>

      <MaterialSelector
        visible={visibleOfTemplateModal}
        onSelect={(ctx) => {
          setVisibleOfTemplateModal(false);
          handleSelect(ctx);
        }}
        onCancel={() => setVisibleOfTemplateModal(false)}
      />

      <footer>
        <div className={styles.left}>
          <span style={{ paddingRight: "10px" }}>归属学库:</span>
          <Select
            value={selectedStudySetId}
            style={{ width: 120 }}
            placeholder="请选择"
            onChange={setSelectedStudySetId}
          >
            {studySetList.map((studySet) => (
              <Select.Option key={studySet.id} value={studySet.id}>
                {studySet.name}
              </Select.Option>
            ))}
          </Select>
          <span style={{ marginLeft: "20px", paddingRight: "10px" }}>
            标题:
          </span>
          <Input
            style={{ display: "inline-block", width: 180 }}
            placeholder="请填写标题"
            value={title}
            onInput={(e) => setTitle(e.currentTarget.value)}
          />
        </div>
        <div className={styles.right}>
          {displayMode === DisplayMode.preview ? (
            <Button
              className={styles.footerBtn}
              type="link"
              onClick={() => setDisplayMode(DisplayMode.editing)}
            >
              取消预览
            </Button>
          ) : (
            <Button
              className={styles.footerBtn}
              type="link"
              onClick={() => setDisplayMode(DisplayMode.preview)}
            >
              &nbsp;预览&nbsp;
            </Button>
          )}
          <Button className={styles.footerBtn} onClick={handleSumbit}>
            提交
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default memo(StudyItemEditor);
