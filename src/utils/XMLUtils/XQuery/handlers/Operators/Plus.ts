import { Operator } from "./Operator";

import { types } from "../../constants/types";
import { orders } from "../../constants/orders";

export class Plus extends Operator {
  static regexp = types.OPERATORS.PLUS;

  getOrder() {
    return orders.PLUS;
  }

  execute(left, right) {
    return Number.parseFloat(left) + Number.parseFloat(right);
  }
}
