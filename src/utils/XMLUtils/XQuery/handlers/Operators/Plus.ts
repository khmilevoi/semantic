import { Operator } from "./Operator";

import { types } from "../../constants/types";

export class Plus extends Operator {
  static regexp = types.OPERATORS.PLUS;

  execute() {
    return null;
  }
}
