import { request } from "@/utils";
import type { Zone } from "@/model";
import type { Response } from "@/@types/global";

export const getZoneList = (): Promise<Response<Zone[]>> =>
  request.get("/api/zone/list");
export const addZone = (name: string): Promise<Response<Zone | null>> =>
  request.post("/api/zone/add");

export default {
  getZoneList,
  addZone,
};
