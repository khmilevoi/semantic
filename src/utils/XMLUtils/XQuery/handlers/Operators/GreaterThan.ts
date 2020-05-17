import { Operator } from "./Operator";

import { types } from "../../constants/types";

export class GreaterThan extends Operator {
  static regexp = types.OPERATORS.GREATER_THAN;

  execute() {
    return null;
  }
}
