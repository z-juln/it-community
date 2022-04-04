import { atom } from "recoil";
import local from "@/utils/local";
import { User } from "@/model";

const userInfoState = atom<User | null>({
  key: "userInfoState",
  default: local.get("userInfo"),
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((userInfo) => {
        if (userInfo === null) {
          local.remove('userInfo');
        } else {
          local.save("userInfo", userInfo);
        }
      });
    },
  ],
});

export default userInfoState;
