import { createExecutor } from "utils/createExecutor";

import { Parser } from "../common/Parser";
import { Token } from "../common/Token";

type Tree = { root: Token; tokens: Token[] };

export class XQueryParser extends Parser {
  private tree: Tree;

  parseToken(token: string) {
    return this.getHandlers().reduce<[Token, string]>(
      ([result, state], handler) => {
        if (!result && handler.verify(token)) {
          const parsed = handler.parse(token);
          const next = handler.nextState(token);

          return [parsed, next];
        }

        return [result, state];
      },
      [null, null]
    );
  }

  parse(xQueryString: string) {
    const splitted = this.splitString(xQueryString, true)
      .map((item) => item.trim())
      .filter((item) => !!item);

    const tokens = [];
    const tree: Tree = { root: null, tokens };

    const stack: Token[] = [];

    splitted.forEach((token) => {
      const [parsed, nextState] = this.parseToken(token);

      if (parsed) {
        if (!tree.root) {
          tree.root = parsed;
        }

        stack.push(parsed);
      }

      if (this.type.R_BRACKET(token)) {
        stack.pop();
      }
    });

    return (this.tree = tree);
  }

  SPLITTER = {
    PLUS: /\+/,
    MINUS: /-/,
    MULTI: /\*/,
    DIV: /div/,
    EQUAL: /=/,
    NOT_EQUAL: /!=/,
    STRICT_LESS_THAN: /</,
    LESS_THAN: /<=/,
    STRICT_GREATER_THAN: />/,
    GREATER_THAN: />=/,
    OR: /or/,
    AND: /and/,
    MOD: /mod/,
    L_BRACKET: /\(/,
    R_BRACKET: /\)/,
  };

  type = createExecutor(this.SPLITTER);
}
