import { request } from "@/utils";
import type { Response } from "@/@types/global";
import { Notification } from "@/model";

export const getNotificationList = (): Promise<
  Response<Notification[]>
> =>
  request.get('/api/notification/list');

export const readNotificationList = (id: number): Promise<
  Response<Notification[]>
  > =>
  request.post('/api/notification/read', { id });

export default {
  getNotificationList,
  readNotificationList,
};
