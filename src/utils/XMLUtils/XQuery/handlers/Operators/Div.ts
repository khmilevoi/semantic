import { Operator } from "./Operator";

import { types } from "../../constants/types";

export class Div extends Operator {
  static regexp = types.OPERATORS.DIV;

  execute() {
    return null;
  }
}
