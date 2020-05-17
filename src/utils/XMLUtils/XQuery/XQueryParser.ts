import { createExecutor } from "utils/createExecutor";

import { Expression } from "./Expression";

import { Parser } from "../common/Parser";
import { Token } from "../common/Token";

import { Operator } from "./handlers/Operators/Operator";

import { types } from "./constants/types";

export type THandel = Expression | Operator | Token;

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

  static addExpression(expressions: Expression[], expression: Expression) {
    return expressions.push(expression);
  }

  parse(xQueryString: string) {
    const splitted = XQueryParser.splitString(xQueryString, true)
      .map((item) => item && item.trim())
      .filter((item) => !!item);

    const expressions: Expression[] = [];
    const root = new Expression();
    const tree: TTree = { root, expressions };

    const stack: Expression[] = [tree.root];
    const brackets: Expression[] = [tree.root];

    // debugger;

    splitted.forEach((token) => {
      const currentExpression = stack[stack.length - 1];

      const parsed = this.parseToken(token);

      if (parsed instanceof Token) {
        if (!currentExpression.getChild()) {
          currentExpression.setChild(parsed);
        } else {
          const expression = new Expression();
          expression.setChild(parsed);

          if (!currentExpression.getNext()) {
            currentExpression.setNext(expression);

            stack.push(expression);
            XQueryParser.addExpression(expressions, expression);
          }
        }
      }

      if (parsed instanceof Expression) {
        if (!currentExpression.getChild()) {
          currentExpression.setChild(parsed);
        } else {
          currentExpression.setNext(parsed);
        }

        XQueryParser.addExpression(expressions, parsed);
        stack.push(parsed);

        if (XQueryParser.type.L_BRACKET(token)) {
          brackets.push(parsed);
        }
      }

      if (parsed instanceof Operator) {
        currentExpression.setOperator(parsed);
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
          throw new Error(`Undefined token [${token}]`);
        }
      }
    });

    return tree;
  }

  static SPLITTER = {
    ...types.OPERATORS,
    FUNCTION: /\w+\([^\)]*\)(\.[^\)]*\))?/,
    L_BRACKET: /\(/,
    R_BRACKET: /\)/,
  };

  static type = createExecutor({ ...XQueryParser.SPLITTER });
}
