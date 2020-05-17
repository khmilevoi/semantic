import { createExecutor } from "utils/createExecutor";

import { Handler } from "../../../common/Handler";

import { states } from "../../constants/states";

export class BracketsHandler extends Handler {
  regexp = /\(|\)/;

  static BRACKETS = {
    OPEN: /\(/,
    CLOSE: /\)/,
  };

  static types = createExecutor(BracketsHandler.BRACKETS);

  parse() {
    return null;
  }

  nextState(token) {
    if (BracketsHandler.types.OPEN(token)) {
      return states.BRACKETS.OPEN;
    }

    if (BracketsHandler.types.CLOSE(token)) {
      return states.BRACKETS.CLOSE;
    }
  }
}
