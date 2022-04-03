import { memo } from "react";
import CommonCard from "./CommonCard";
import type { StudyRoute } from "@/model";
import type { CommonProps } from "@/@types/global";

export interface StudySetCardProps extends CommonProps {
  data: StudyRoute;
}

export const StudyRouteCard: React.FC<StudySetCardProps> = ({
  data,
  ...resetProps
}) => (
  <CommonCard
    data={data}
    getLink={(data) => `/study-route/${data.id}`}
    getDefaultDetail={(data) => `学习路线 —— ${data.name}`}
    {...resetProps}
  />
);

export default memo(StudyRouteCard);
