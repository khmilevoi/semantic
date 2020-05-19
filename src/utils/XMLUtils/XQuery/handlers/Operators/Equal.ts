import { Operator } from "./Operator";

import { types } from "../../constants/types";
import { orders } from "../../constants/orders";

export class Equal extends Operator {
  static regexp = /^=/;

  getOrder() {
    return orders.EQUAL;
  }

  execute(left, right) {
    return left == right;
  }
}
