import { MaterialType } from "./model";
import SingleChoice, { ctxTemplate as SingleChoiceCtxTemplate } from "./components/SingleChoice";
import MultChoice, { ctxTemplate as MultChoiceCtxTemplate } from "./components/MultChoice";

export const MaterialMap = {
  [MaterialType.SINGLE_CHOICE]: SingleChoice,
  [MaterialType.MULT_CHOICE]: MultChoice,
};

export const templateMap = {
  [MaterialType.SINGLE_CHOICE]: SingleChoiceCtxTemplate,
  [MaterialType.MULT_CHOICE]: MultChoiceCtxTemplate,
};
