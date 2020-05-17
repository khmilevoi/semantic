import { Operator } from "./Operator";

import { types } from "../../constants/types";

export class Equal extends Operator {
  static regexp = /^=/;

  execute() {
    return null;
  }
}
