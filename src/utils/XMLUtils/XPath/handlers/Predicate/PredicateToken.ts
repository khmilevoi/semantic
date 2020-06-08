import { XQuery } from "../../../XQuery";

import { Token } from "../../../common/Token";
import { XPath } from "../../XPath";
import { Tag } from "../../../XMLDocument";

export class PredicateToken extends Token {
  static type = "predicate";

  private name: string;
  private predicate: string;
  private nameQuery: XPath;
  private predicateQuery: XQuery;

  constructor(content: string) {
    const [name, predicate] = content.split(PredicateToken.regexps.BRACKET);
    super(PredicateToken.type, content);

    this.name = name;
    this.predicate = predicate;

    const xPath = new XPath(this.name);
    this.nameQuery = xPath;

    const xQuery = new XQuery(this.predicate);
    this.predicateQuery = xQuery;
  }

  parse(): PredicateToken {
    this.predicateQuery.parse();
    this.nameQuery.parse();

    return this;
  }

  execute(tag: Tag) {
    const tags = this.nameQuery.execute(tag);

    return this.predicateQuery.execute(tags).getRoot().getChildren();
  }

  static regexps = {
    BRACKET: /\[|\]/,
  };
}
