import { XQuery } from "../../../XQuery";

import { Token } from "../../../common/Token";
import { Tag } from "utils/XMLUtils/XMLDocument";

export class PredicateToken extends Token {
  static type = "predicate";

  private name: string;
  private predicate: string;
  private query: XQuery;

  constructor(content: string) {
    const [name, predicate] = content.split(PredicateToken.regexps.BRACKET);

    super(PredicateToken.type, content);

    this.name = name;
    this.predicate = predicate;

    const xQuery = new XQuery(this.predicate);
    this.query = xQuery;
  }

  parse(): PredicateToken {
    this.query.parse();

    return this;
  }

  execute(tag: Tag) {
    const tags = tag.findAll(this.name, false);

    return this.query.execute(tags).getRoot().getChildren();
  }

  static regexps = {
    BRACKET: /\[|\]/,
  };
}
