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
  ...materialProps
}) => {
  const { initCtx } = materialProps;
  const Node = MaterialMap[(initCtx?.type ?? type)!];

  return (
    <div className={`${className} ${styles.Material}`} style={style}>
      <Node {...materialProps as any} />
    </div>
  );
};

export default memo(Material);
