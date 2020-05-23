import { Operator } from "../Operator";

import { types } from "../../../constants/types";
import { orders } from "../../../constants/orders";

export class NotEqual extends Operator {
  static regexp = types.OPERATORS.NOT_EQUAL;

  getOrder() {
    return orders.NOT_EQUAL;
  }

  calc(left, right) {
    return left != right;
  }
}
