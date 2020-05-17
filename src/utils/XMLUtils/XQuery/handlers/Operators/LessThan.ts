import { Operator } from "./Operator";

import { types } from "../../constants/types";

export class LessThen extends Operator {
  static regexp = types.OPERATORS.LESS_THAN;

  execute() {
    return null;
  }
}
