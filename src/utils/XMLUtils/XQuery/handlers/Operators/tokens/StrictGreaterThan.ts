import { Operator } from "../Operator";
import { orders } from "../../../constants/orders";

export class StrictGreaterThan extends Operator {
  static regexp = /^>/;

  getOrder() {
    return orders.STRICT_GREATER_THAN;
  }

  calc(left, right) {
    return Number.parseFloat(left) > Number.parseFloat(right);
  }
}
