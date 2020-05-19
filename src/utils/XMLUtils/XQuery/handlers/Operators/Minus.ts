import { Operator } from "./Operator";

import { types } from "../../constants/types";
import { orders } from "../../constants/orders";

export class Minus extends Operator {
  static regexp = types.OPERATORS.MINUS;

  getOrder() {
    return orders.MINUS;
  }

  execute(left, right) {
    return Number.parseFloat(left) - Number.parseFloat(right);
  }
}
