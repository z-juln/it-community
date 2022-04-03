import { request } from "@/utils";
import type { Response } from "@/@types/global";
import { Discuss, DiscussWithChildren } from "@/model";

export const addDiscuss = ({
  topId = -1,
  content,
  type = "super",
  super_id = -1,
  super_type = "item",
}: Partial<Discuss> & { topId: number }): Promise<Response<Discuss | null>> =>
  request.post("/api/discuss/add", {
    topId,
    content,
    type,
    super_id,
    super_type,
  });

export const getDiscussList = ({
  super_id,
  super_type = "item",
}: Pick<Discuss, "super_id" | "super_type">): Promise<
  Response<DiscussWithChildren[]>
> =>
  request.get(
    `/api/discuss/list?super_id=${super_id}&super_type=${super_type}`
  );

export default {
  addDiscuss,
  getDiscussList,
};
