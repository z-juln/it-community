import type { DBStudySet } from ".";

export interface DBStudyItem {
  uid: number;
  id: number;
  set_id: number;
  title: string;
  content: string;
  problems: string;
  praise_count: number;
  tread_count: number;
}

export interface StudyItem {
  uid: number;
  id: number;
  set: DBStudySet;
  title: string;
  detail: string;
  content: string;
  praise_count: number;
  tread_count: number;
}

export default StudyItem;
