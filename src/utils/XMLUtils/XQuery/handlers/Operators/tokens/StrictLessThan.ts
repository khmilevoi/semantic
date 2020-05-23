import { Operator } from "../Operator";

import { types } from "../../../constants/types";
import { orders } from "../../../constants/orders";

export class StrictLessThen extends Operator {
  static regexp = /^</;

  getOrder() {
    return orders.STRICT_LESS_THAN;
  }

  calc(left, right) {
    return Number.parseFloat(left) < Number.parseFloat(right);
  }
}
