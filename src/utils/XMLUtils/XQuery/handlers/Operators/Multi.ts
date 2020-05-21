import { Operator } from "./Operator";

import { types } from "../../constants/types";
import { orders } from "../../constants/orders";
import { Expression } from "../../Expression";
import { Tag } from "utils/XMLUtils/XMLDocument";
import { Token } from "utils/XMLUtils/common/Token";

export class Multi extends Operator {
  static regexp = types.OPERATORS.MULTI;

  getOrder() {
    return orders.MULTI;
  }

  calc(left, right) {
    return Number.parseFloat(left) * Number.parseFloat(right);
  }
}
