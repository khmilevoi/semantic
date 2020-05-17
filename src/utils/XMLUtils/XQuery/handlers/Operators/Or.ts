import { Operator } from "./Operator";

import { types } from "../../constants/types";

export class Or extends Operator {
  static regexp = types.OPERATORS.OR;

  execute() {
    return null;
  }
}
