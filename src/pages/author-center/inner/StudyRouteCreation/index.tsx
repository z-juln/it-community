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

export interface StudyRouteCreationProps extends CommonProps {}

const StudyRouteCreation: React.FC<StudyRouteCreationProps> = ({
  className = "",
  style = {},
}) => {
  const navigate = useNavigate();

  return (
    <div className={`${className} ${styles.StudyRouteCreation}`} style={style}>
      StudyRouteCreation
    </div>
  );
};

export default memo(StudyRouteCreation);
