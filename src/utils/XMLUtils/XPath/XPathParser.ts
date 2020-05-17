import { Token } from "../common/Token";

import { Parser } from "../common/Parser";

export class XPathParser extends Parser {
  private path: Token[];

  getPath() {
    return this.path;
  }

  parse(xPathString: string): Token[] {
    const splitted = this.splitString(xPathString);

    const tokens = splitted.map((token) =>
      this.getHandlers().reduce<Token>((result, handler) => {
        if (!result && handler.verify(token)) {
          return handler.parse(token);
        }

        return result;
      }, null)
    );

    tokens.forEach((token, index) => {
      if (!token) {
        throw new Error(`Incorrect token [${splitted[index]}]`);
      }
    });

    return (this.path = tokens);
  }

  SPLITTER = {
    SLASH: /\//,
    SQUARE_BRACKET: /(?=\[)/,
  };
}
