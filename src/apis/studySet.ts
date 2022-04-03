import { request } from "@/utils";
import type { StudyItem, StudySet } from "@/model";
import type { Response } from "@/@types/global";

export const getStudySetInfo = (id: string): Promise<Response<StudySet>> =>
  request.get(`/api/study-set/info?id=${id}`);

export const getStudySetList = (
  keyword = "",
  zone_id = -1,
  pageIndex = 0,
  pageNum = 20
): Promise<Response<StudySet[]>> =>
  request.get(
    `/api/study-set/list?keyword=${keyword}&pageIndex=${pageIndex}&pageNum=${pageNum}&zone_id=${zone_id}`
  );

export const getItemsOfStudySet = (
  setId = "-1",
  pageIndex = 0,
  pageNum = 20
): Promise<Response<StudyItem[]>> =>
  request.get(
    `/api/study-item/list?setId=${setId}&pageIndex=${pageIndex}&pageNum=${pageNum}`
  );

export default {
  getStudySetInfo,
  getStudySetList,
  getItemsOfStudySet,
};
