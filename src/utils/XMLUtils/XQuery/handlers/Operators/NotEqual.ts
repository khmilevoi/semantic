import { Operator } from "./Operator";

import { types } from "../../constants/types";

export class NotEqual extends Operator {
  static regexp = types.OPERATORS.NOT_EQUAL;

  execute() {
    return null;
  }
}
