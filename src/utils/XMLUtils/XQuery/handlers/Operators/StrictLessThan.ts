import { Operator } from "./Operator";

import { types } from "../../constants/types";

export class StrictLessThen extends Operator {
  static regexp = /^</;

  execute() {
    return null;
  }
}
