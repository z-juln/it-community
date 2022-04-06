import { DBStudySet } from './../model/studySet';
import { request } from "@/utils";
import type { StudyItem, StudySet } from "@/model";
import type { Response } from "@/@types/global";

export const getStudySetInfo = (id: string): Promise<Response<StudySet>> =>
  request.get(`/api/study-set/info?id=${id}`);

export const getStudySetList = ({
  uid,
  keyword = '',
  zone_id = -1,
  pageIndex = 0,
  pageNum = 20
}: Partial<{
  uid: number;
  keyword: string;
  zone_id: number;
  pageIndex: number;
  pageNum: number;
}>): Promise<Response<StudySet[]>> => {
  let query = `?keyword=${keyword}&zone_id=${zone_id}&pageIndex=${pageIndex}&pageNum=${pageNum}`;
  if (uid) {
    query += `&uid=${uid}`;
  }
  return request.get(`/api/study-set/list${query}`);
}

export const addStudySet =
  (params: any): Promise<Response<StudySet | null>> =>
  request.post('/api/study-set/add', params);

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
