import { Operator } from "./Operator";

import { types } from "../../constants/types";
import { orders } from "../../constants/orders";

export class Multi extends Operator {
  static regexp = types.OPERATORS.MULTI;

  getOrder() {
    return orders.MULTI;
  }

  execute(left, right) {
    return Number.parseFloat(left) * Number.parseFloat(right);
  }
}
