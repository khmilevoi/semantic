import { Operator } from "../Operator";

import { types } from "../../../constants/types";
import { orders } from "../../../constants/orders";

export class LessThen extends Operator {
  static regexp = types.OPERATORS.LESS_THAN;

  getOrder() {
    return orders.LESS_THAN;
  }

  calc(left, right) {
    return left <= right;
  }
}
