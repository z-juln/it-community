import React, { memo, useMemo, useState } from "react";
import styles from "./index.module.scss";
import { MaterialBaseProps, MaterialType } from "../../model";
import type { Ctx } from "./model";
import { Button, Input } from "antd";

export interface ConfirmProps extends MaterialBaseProps<Ctx> {
  initCtx?: Ctx;
}

export const ctxTemplate: Ctx = {
  type: MaterialType.CONFIRM,
  title: "问答题xxx",
  content: "1 + 1 = ?",
  answer: "2",
};

export const Confirm: React.FC<ConfirmProps> = ({
  className = "",
  style = {},
  showTemplateCtxBox = false,
  initCtx = ctxTemplate,
  onChange,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showTemplateCtx, setShowTemplateCtx] = useState(false);
  const [error, setError] = useState<any>(null);
  const [configValue, setConfigValue] = useState(
    JSON.stringify(ctxTemplate, null, 2)
  );
  const ctx = useMemo(() => {
    try {
      const result = JSON.parse(configValue) as Ctx;
      setError(null);
      return result;
    } catch (error) {
      setError(error);
    }
  }, [configValue]);

  return (
    <div className={`${className} ${styles.Confirm}`} style={style}>
      {!error && ctx ? (
        <article>
          <p className="title">{ctx.title}</p>
          <p>题目: {ctx.content}</p>
        </article>
      ) : (
        <div>error: {`${error}`}</div>
      )}

      <footer>
        <div className={styles.answerBox}>
          <hr />
          {showAnswer ? (
            <div>答案: {ctx?.answer}</div>
          ) : (
            <Button onClick={() => setShowAnswer(true)}>查看答案</Button>
          )}
        </div>
        {showTemplateCtxBox && (
          <div>
            <hr />
            <Button onClick={() => setShowTemplateCtx((bool) => !bool)}>
              {showTemplateCtx ? "隐藏" : "查看"}配置参数
            </Button>
            {showTemplateCtx && (
              <>
                <p>配置参数:</p>
                <Input.TextArea
                  value={configValue}
                  autoSize
                  onChange={(e) => {
                    const value = e.currentTarget.value;
                    setConfigValue(value);
                    onChange?.(value);
                  }}
                />
              </>
            )}
          </div>
        )}
      </footer>
    </div>
  );
};

export default memo(Confirm);
