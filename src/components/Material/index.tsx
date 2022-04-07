import React, { memo } from "react";
import styles from "./index.module.scss";
import { MaterialMap } from "./materialMap";
import type { MaterialBaseProps, MaterialType } from "./model";

export interface MaterialProps extends MaterialBaseProps {
  type?: MaterialType;
}

const Material: React.FC<MaterialProps> = ({
  className = "",
  style = {},
  type,
  initCtx,
  onChange,
  ...materialProps
}) => {
  const Node = MaterialMap[(initCtx?.type ?? type)!];

  return (
    <div className={`${className} ${styles.Material}`} style={style}>
      <Node
        {...materialProps as any}
        initCtx={initCtx}
        onChange={(_newCtx) => {
          // const newCtx: typeof initCtx = typeof _newCtx === 'string' ? JSON.parse(_newCtx) : _newCtx;
          // if (
          //   initCtx?.type === newCtx?.type
          //   && initCtx?.title === newCtx?.title
          //   && initCtx?.content === newCtx?.content
          //   && initCtx?.answer === newCtx?.answer
          // ) {
          //   return;
          // }
          onChange?.(_newCtx);
        }}
      />
    </div>
  );
};

export default memo(Material);
