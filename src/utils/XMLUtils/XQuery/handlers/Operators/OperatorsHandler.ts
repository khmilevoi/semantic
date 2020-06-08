import { CombinedHandler } from "../../../common/CombinedHandler";
import { combineRegExp } from "../../../common/combineRegExp";

import { types } from "../../constants/types";

import { Operator } from "./Operator";

export class OperatorsHandler extends CombinedHandler<Operator> {
  regexp = combineRegExp(Object.values(types.OPERATORS), false, false);
}
