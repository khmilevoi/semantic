import { createExecutor } from "utils/createExecutor";

import { Expression } from "./Expression";

import { Parser } from "../common/Parser";
import { Token } from "../common/Token";

import { Operator } from "./handlers/Operators/Operator";
import { Function } from "../common/Functions/Function";

import { types } from "./constants/types";

export type THandel = Expression | Operator | Token | Function;

export type TTree = { root: Expression; expressions: Expression[] };

export class XQueryParser extends Parser<THandel> {
  parseToken(token: string) {
    return this.getHandlers().reduce((result, handler) => {
      if (!result && handler.verify(token)) {
        const parsed = handler.parse(token);

        return parsed;
      }

      return result;
    }, null);
  }

  createChild(
    current: Expression,
    parsed: Expression | Token
  ): [Expression?, boolean?] {
    if (!current.getChild()) {
      current.setChild(parsed);
    } else {
      const expression = new Expression();
      expression.setChild(parsed);

      if (!current.getNext()) {
        current.setNext(expression);

        return [expression, true];
      }
    }

    return [];
  }

  parse(xQueryString: string) {
    const splitted = XQueryParser.splitString(xQueryString, true)
      .map((item) => item && item.trim())
      .filter((item) => !!item);

    const root = new Expression();
    const expressions: Expression[] = [root];
    const tree: TTree = { root, expressions };

    const stack: Expression[] = [root];
    const brackets: Expression[] = [root];

    splitted.forEach((token) => {
      const currentExpression = stack[stack.length - 1];

      if (!currentExpression) {
        throw new Error("Something went wrong");
      }

      const parsed = this.parseToken(token);

      if (parsed instanceof Operator) {
        const deep = stack.length;

        if (!currentExpression) {
          debugger;
        }

        currentExpression.setOperator(parsed, deep);
      } else if (parsed instanceof Token) {
        const [child, isNext] = this.createChild(currentExpression, parsed);

        if (isNext) {
          stack.push(child);
          expressions.push(child);
        }
      } else if (parsed instanceof Expression) {
        const [child, isNext] = this.createChild(currentExpression, parsed);

        if (isNext) {
          stack.push(child);
          expressions.push(child);
        }

        stack.push(parsed);
        expressions.push(parsed);

        if (XQueryParser.type.L_BRACKET(token)) {
          brackets.push(parsed);
        }
      }

      if (
        XQueryParser.type.R_BRACKET(token) &&
        !XQueryParser.type.FUNCTION(token)
      ) {
        const last = brackets.pop();
        const index = stack.indexOf(last);

        if (index !== -1) {
          stack.splice(index);
        }
      } else {
        if (!parsed) {
          debugger;
          throw new Error(`Undefined token [${token}]`);
        }
      }
    });

    if (brackets.length !== 1) {
      throw new Error("Incorrect balance of brackets");
    }

    return tree;
  }

  static SPLITTER = {
    ...types.OPERATORS,
    FUNCTION: /\w+\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)/,
    L_BRACKET: /\(/,
    R_BRACKET: /\)/,
  };

  static type = createExecutor({ ...XQueryParser.SPLITTER });
}
