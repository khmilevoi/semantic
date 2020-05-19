import { Operator } from "./Operator";

import { types } from "../../constants/types";
import { orders } from "../../constants/orders";

export class Or extends Operator {
  static regexp = types.OPERATORS.OR;

  getOrder() {
    return orders.OR;
  }

  execute(left, right) {
    return !!left || !!right;
  }
}
