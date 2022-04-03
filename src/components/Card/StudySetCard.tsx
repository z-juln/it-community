import { memo } from "react";
import CommonCard from "./CommonCard";
import type { StudySet } from "@/model";
import type { CommonProps } from "@/@types/global";

export interface StudySetCardProps extends CommonProps {
  data: StudySet;
}

export const StudySetCard: React.FC<StudySetCardProps> = ({
  data,
  ...restProps
}) => (
  <CommonCard
    data={data}
    getLink={(data) => `/study-set/${data.id}`}
    getDefaultDetail={(data) => `学库 —— ${data.name}`}
    {...restProps}
  />
);

export default memo(StudySetCard);
