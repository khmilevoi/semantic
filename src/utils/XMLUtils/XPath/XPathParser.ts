import { Token } from "../common/Token";

import { Parser } from "../common/Parser";

export class XPathParser extends Parser<Token> {
  parse(xPathString: string): Token[] {
    const splitted = XPathParser.splitString(xPathString);

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

    return tokens;
  }

  static SPLITTER = {
    SLASH: /\//,
  };
}
