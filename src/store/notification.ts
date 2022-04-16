import { atom } from "recoil";

const notificationState = atom<{ unReadCount: number }>({
  key: "notificationState",
  default: {
    unReadCount: 0
  },
});

export default notificationState;
