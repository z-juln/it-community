import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import styles from "./index.module.scss";
import StudyItemEditor, { StudyItemEditorProps } from "../StudyItemEditor";

export interface StudyItemCreationProps extends StudyItemEditorProps {}

const StudyItemCreation: React.FC<StudyItemCreationProps> = ({
  className = "",
  style = {},
  ...props
}) => {
  return (
    <StudyItemEditor
      className={`${className} ${styles.StudyItemCreation}`}
      style={style}
      {...props}
    />
  );
};

export default memo(StudyItemCreation);
