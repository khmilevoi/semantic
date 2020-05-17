import { Operator } from "./Operator";

import { types } from "../../constants/types";

export class Minus extends Operator {
  static regexp = types.OPERATORS.MINUS;

  execute() {
    return null;
  }
}
