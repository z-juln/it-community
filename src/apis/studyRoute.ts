import { request } from "@/utils";
import type { StudyRoute } from "@/model";
import type { Response } from "@/@types/global";

export const getStudyRouteList = ({
  keyword = "",
  zone_id = -1,
  pageIndex = 0,
  pageNum = 20,
  ownId = -1,
}): Promise<Response<StudyRoute[]>> =>
  request.get(
    `/api/study-route/list?keyword=${keyword}&pageIndex=${pageIndex}&pageNum=${pageNum}&zone_id=${zone_id}&ownId=${ownId}`
  );

export const getStudyRoute = ({
  name,
  id,
}: Partial<{
  name: string;
  id: number;
}>): Promise<Response<StudyRoute>> => {
  let url = `/api/study-route/info?1=1`;
  if (name) {
    url += `&name=${name}`;
  }
  if (id) {
    url += `&id=${id}`;
  }
  return request.get(url);
};

export const addStudyRoute = (params: {
  name: string;
  zone_id: number;
  nodes: string;
  detail?: string;
  links?: string;
  cover?: string;
}): Promise<Response<StudyRoute | null>> =>
  request.post('/api/study-route/add', params);

export default {
  getStudyRouteList,
  getStudyRoute,
};
