import { Operator } from "./Operator";

import { types } from "../../constants/types";
import { orders } from "../../constants/orders";

export class Mod extends Operator {
  static regexp = types.OPERATORS.MOD;

  getOrder() {
    return orders.MOD;
  }

  execute(left, right) {
    return Number.parseInt(left) % Number.parseInt(right);
  }
}
