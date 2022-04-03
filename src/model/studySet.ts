import type { Zone } from "@/model";

export interface DBStudySet {
  id: number;
  zone_id: number;
  name: string;
  cover: string;
  detail: string;
  links: string[];
  praise_count: number;
  tread_count: number;
}

export interface StudySet {
  id: number;
  zone: Zone;
  name: string;
  cover: string;
  detail: string;
  links: string[];
  praise_count: number;
  tread_count: number;
}

export default StudySet;
