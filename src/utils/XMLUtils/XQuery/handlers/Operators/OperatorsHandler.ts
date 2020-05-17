import { Handler } from "utils/XMLUtils/common/Handler";
import { combineRegExp } from "utils/XMLUtils/common/combineRegExp";

import { types } from "../../constants/types";

import { Operator } from "./Operator";

export class OperatorsHandler extends Handler<Operator> {
  regexp = combineRegExp(Object.values(types.OPERATORS));

  operators: typeof Operator[] = [];

  addOperator(operator: typeof Operator) {
    this.operators.push(operator);

    return this;
  }

  createOperator(token: string) {
    return this.operators.reduce<Operator>((result, operator) => {
      if (!result && operator.verify(token)) {
        const currentOperator = operator.createOperator(token);

        return currentOperator;
      }

      return result;
    }, null);
  }

  parse(token: string) {
    return this.createOperator(token);
  }
}
