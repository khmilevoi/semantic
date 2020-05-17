import { XQuery } from "../../../XQuery";

import { Token } from "../../../common/Token";

export class PredicateToken extends Token {
  static type = "predicate";

  private name: string;
  private predicate: string;
  private query: XQuery;

  constructor(content: string) {
    const predicate = content.replace(PredicateToken.regexps.BRACKET, "");

    super(PredicateToken.type, predicate);

    const xQuery = new XQuery(predicate);
    this.query = xQuery;
  }

  parse(): PredicateToken {
    this.query.parse();

    return this;
  }

  static regexps = {
    BRACKET: /(^\[)|(\]$)/g,
  };
}
