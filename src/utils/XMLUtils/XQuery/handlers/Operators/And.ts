import { Operator } from "./Operator";

import { types } from "../../constants/types";

export class And extends Operator {
  static regexp = types.OPERATORS.AND;

  execute(left, right) {
    return !!left && !!right;
  }
}
