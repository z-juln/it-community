import { request } from "@/utils";
import type { Apply, StudyItem } from "@/model";
import type { Response } from "@/@types/global";

export const getStudyItemInfo = (id: string): Promise<Response<StudyItem>> =>
  request.get(`/api/study-item/info?id=${id}`);

export const getApplyList =
  (params: Partial<Pick<
    Apply, 'uid' | 'status' | 'target_id'> & {title: string}
  >): Promise<Response<Apply[]>> =>
  request.post(`/api/study-item/apply-list`, params);

export default {
  getStudyItemInfo,
  getApplyList,
};
