import { Operator } from "./Operator";

import { types } from "../../constants/types";

export class Multi extends Operator {
  static regexp = types.OPERATORS.MULTI;

  execute() {
    return null;
  }
}
