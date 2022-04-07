import React, { memo, useEffect, useMemo, useState } from "react";
import styles from "./index.module.scss";
import { MaterialBaseProps, MaterialType } from "../../model";
import type { Ctx } from "./model";
import { Button, Input } from "antd";

export interface SingleChoiceProps extends MaterialBaseProps<Ctx> {
  initCtx?: Ctx;
}

export const ctxTemplate: Ctx = {
  type: MaterialType.SINGLE_CHOICE,
  title: "单选题学点xxx",
  content: {
    a: "aaa",
    b: "bbb",
    c: "ccc",
  },
  answer: "a",
};

export const SingleChoice: React.FC<SingleChoiceProps> = ({
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
    JSON.stringify(initCtx, null, 2)
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
    <div className={`${className} ${styles.SingleChoice}`} style={style}>
      {!error && ctx ? (
        <article>
          <p className="title">{ctx.title}</p>
          <ul style={{ paddingLeft: "18px" }}>
            {Object.entries(ctx.content ?? []).map(([index, coreText]) => (
              <li>
                {index}. {coreText}
              </li>
            ))}
          </ul>
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

export default memo(SingleChoice);
