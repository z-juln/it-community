import React, { memo, useState } from "react";
import styles from "./index.module.scss";
import type { CommonProps } from "@/@types/global";
import { MaterialBaseCtx, MaterialType } from "../Material/model";
import { Button, Modal, ModalProps } from "antd";
import { MaterialMap, templateMap } from "../Material/materialMap";
import Material from "../Material";

export interface MaterialSelectorProps extends CommonProps, ModalProps {
  visible?: boolean;
  onSelect?: (ctx: MaterialBaseCtx) => void;
  onCancel?: () => void;
}

const MaterialSelector: React.FC<MaterialSelectorProps> = ({
  className = "",
  style = {},
  visible = false,
  onSelect,
  onCancel,
  ...props
}) => {
  const [selectedCtx, setSelectedCtx] = useState<MaterialBaseCtx | null>(null);
  const selectedTemplateType = selectedCtx?.type ?? null;

  return (
    <Modal
      className={`${className} ${styles.MaterialSelector}`}
      style={style}
      title="选用模板"
      visible={visible}
      footer={null}
      onCancel={onCancel}
      {...props}
    >
      <div className={styles.selectBox}>
        <ul>
          {Object.keys(MaterialMap).map((type) => (
            <li
              className={selectedTemplateType === type ? styles.actived : ""}
              key={type}
              onClick={() => {
                setSelectedCtx(templateMap[type as MaterialType]);
              }}
            >
              <Material
                type={type as MaterialType}
                showTemplateCtxBox
                onChange={(mayBeCtx) => {
                  let ctx: MaterialBaseCtx | null = null;
                  if (typeof mayBeCtx === "string") {
                    try {
                      ctx = JSON.parse(mayBeCtx);
                    } catch {}
                  } else {
                    ctx = mayBeCtx;
                  }
                  if (!ctx) {
                    setSelectedCtx(ctx);
                  }
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.tip}>即将推出其它模板，敬请期待</div>
      <Button
        className={styles.ensureBtn}
        onClick={() => {
          if (!selectedCtx) return;
          onSelect?.(selectedCtx);
        }}
        disabled={!selectedTemplateType}
      >
        确定
      </Button>
    </Modal>
  );
};

export default memo(MaterialSelector);
