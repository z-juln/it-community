import { RankingType, Ranking } from "@/model";
import { request } from "@/utils";
import type { Response } from "@/@types/global";

export const getRanking = (
  type: RankingType,
  limit: number = 20
): Promise<Response<Ranking>> =>
  request.get(`/api/ranking/list?type=${type}&limit=${limit}`);

export default {
  getRanking,
};
