import { Operator } from "./Operator";
import { orders } from "../../constants/orders";

export class StrictGreaterThan extends Operator {
  static regexp = /^>/;

  getOrder() {
    return orders.STRICT_GREATER_THAN;
  }

 
  execute(left, right) {
    return left > right;
  }
}
