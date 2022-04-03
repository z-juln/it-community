import { request } from "@/utils";
import type { StudyItem } from "@/model";
import type { Response } from "@/@types/global";

export const getStudyItemInfo = (id: string): Promise<Response<StudyItem>> =>
  request.get(`/api/study-item/info?id=${id}`);

export default {
  getStudyItemInfo,
};
