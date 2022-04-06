import { CommonProps } from "@/@types/global";

export enum MaterialType {
  SINGLE_CHOICE = "single-choice",
  MULT_CHOICE = "mult-choice",
}

export interface MaterialBaseCtx {
  type: MaterialType;
  title: any;
  content: any;
  answer: any;
}

export interface MaterialBaseProps<
  Ctx extends MaterialBaseCtx = MaterialBaseCtx
> extends CommonProps {
  initCtx?: Ctx;
  showTemplateCtxBox?: boolean;
  onChange?: (ctx: string | Ctx) => void;
}
