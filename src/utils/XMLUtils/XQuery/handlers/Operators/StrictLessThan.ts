import { Operator } from "./Operator";

import { types } from "../../constants/types";
import { orders } from "../../constants/orders";

export class StrictLessThen extends Operator {
  static regexp = /^</;

  getOrder() {
    return orders.STRICT_LESS_THAN;
  }

  execute(left, right) {
    return left < right;
  }
}
