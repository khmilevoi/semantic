import { Operator } from "./Operator";

import { types } from "../../constants/types";
import { orders } from "../../constants/orders";

export class Div extends Operator {
  static regexp = types.OPERATORS.DIV;

  getOrder() {
    return orders.DIV;
  }

  calc(left, right) {
    return Number.parseFloat(left) / Number.parseFloat(right);
  }
}
