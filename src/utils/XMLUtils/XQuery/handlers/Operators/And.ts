import { Operator } from "./Operator";

import { types } from "../../constants/types";

export class AND extends Operator {
  static regexp = types.OPERATORS.AND;

  execute() {
    return null;
  }
}
