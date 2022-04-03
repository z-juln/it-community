import { atom } from "recoil";

const popupLoginPanelState = atom<boolean>({
  key: "popupLoginPanel",
  default: false,
});

export default popupLoginPanelState;
