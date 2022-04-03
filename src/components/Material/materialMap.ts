import { MaterialType } from "./model";
import SingleChoice, { ctxTemplate } from "./components/SingleChoice";

export const MaterialMap = {
  [MaterialType.SINGLE_CHOICE]: SingleChoice,
};

export const templateMap = {
  [MaterialType.SINGLE_CHOICE]: ctxTemplate,
};
