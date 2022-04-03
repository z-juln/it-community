import { atom, useRecoilState } from "recoil";
import { useEffect } from "react";
import * as apis from "@/apis";
import type { Zone } from "@/model";

const zoneListState = atom<Zone[] | null>({
  key: "zoneListState",
  default: null,
});

export function useZoneList(): Zone[] {
  const [zoneList, setZoneList] = useRecoilState(zoneListState);
  useEffect(() => {
    apis.getZoneList().then(({ data }) => {
      setZoneList(data);
    });
  }, []);
  const allZone: Zone = { id: -1, name: "全部专区" };
  return zoneList ? [allZone, ...zoneList] : [allZone];
}

export default zoneListState;
