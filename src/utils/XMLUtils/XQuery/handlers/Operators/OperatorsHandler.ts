import { CombinedHandler } from "utils/XMLUtils/common/CombinedHandler";
import { combineRegExp } from "utils/XMLUtils/common/combineRegExp";

import { types } from "../../constants/types";

import { Operator } from "./Operator";

export class OperatorsHandler extends CombinedHandler<Operator> {
  regexp = combineRegExp(Object.values(types.OPERATORS));
}
