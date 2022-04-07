import { MaterialType } from "./model";
import SingleChoice, { ctxTemplate as SingleChoiceCtxTemplate } from "./components/SingleChoice";
import MultChoice, { ctxTemplate as MultChoiceCtxTemplate } from "./components/MultChoice";
import Confirm, { ctxTemplate as ConfirmCtxTemplate } from "./components/Confirm";
import Input, { ctxTemplate as InputCtxTemplate } from "./components/Input";

export const MaterialMap = {
  [MaterialType.SINGLE_CHOICE]: SingleChoice,
  [MaterialType.MULT_CHOICE]: MultChoice,
  [MaterialType.CONFIRM]: Confirm,
  [MaterialType.INPUT]: Input,
};

export const templateMap = {
  [MaterialType.SINGLE_CHOICE]: SingleChoiceCtxTemplate,
  [MaterialType.MULT_CHOICE]: MultChoiceCtxTemplate,
  [MaterialType.CONFIRM]: ConfirmCtxTemplate,
  [MaterialType.INPUT]: InputCtxTemplate,
};
