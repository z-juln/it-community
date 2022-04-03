import { MaterialBaseCtx } from "./../../model";

export interface Ctx extends MaterialBaseCtx {
  title: string;
  content: {
    [Index: string]: string;
  };
  answer: string;
}
