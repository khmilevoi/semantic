import { createExecutor } from "utils/createExecutor";

import { Handler } from "../../../common/Handler";

import { Expression } from "../../Expression";

export class BracketsHandler extends Handler<Expression> {
  regexp = /^(\(|\))/;

  static BRACKETS = {
    OPEN: /\(/,
    CLOSE: /\)/,
  };

  static types = createExecutor(BracketsHandler.BRACKETS);

  parse(token: string) {
    if (BracketsHandler.types.OPEN(token)) {
      const expression = new Expression();

      return expression;
    }

    return null;
  }
}