import { atom } from "recoil";
import { Notification as NotificationType } from '@/model';

const notificationState = atom<{ unReadCount: number, list: NotificationType[] }>({
  key: "notificationState",
  default: {
    unReadCount: 0,
    list: [],
  },
});

export default notificationState;
