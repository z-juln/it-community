import { request } from "@/utils";
import type { Apply, User } from "@/model";
import type { Response } from "@/@types/global";

export const getApplyStatus = (): Promise<Response<Apply | null>> =>
  request.get('/api/provider/apply-info');

export const applyProvider = (uid: number): Promise<Response<User | null>> =>
  request.post("/api/provider/apply", { uid });

export const postArticle = ({
  content,
  detail,
  setId,
  title,
  articleId = -1,
}: {
  content: string;
  detail: string;
  setId: number;
  title: string;
  articleId?: number;
}): Promise<Response<{ articleId: number } | null>> =>
  request.post("/api/provider/post-article", {
    content,
    setId,
    detail,
    articleId,
    title,
  });

export default {
  applyProvider,
  postArticle,
};
