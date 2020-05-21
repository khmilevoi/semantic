import { Operator } from "./Operator";

import { types } from "../../constants/types";

export class And extends Operator {
  static regexp = types.OPERATORS.AND;

  calc(left, right) {
    return !!left && !!right;
  }
}
