import { Operator } from "../Operator";

import { types } from "../../../constants/types";
import { orders } from "../../../constants/orders";

export class GreaterThan extends Operator {
  static regexp = types.OPERATORS.GREATER_THAN;

  getOrder() {
    return orders.GREATER_THAN;
  }

  calc(left, right) {
    return left >= right
  }
}
