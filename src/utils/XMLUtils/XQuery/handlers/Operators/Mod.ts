import { Operator } from "./Operator";

import { types } from "../../constants/types";

export class Mod extends Operator {
  static regexp = types.OPERATORS.MOD;

  execute() {
    return null;
  }
}
