import { XPathParser } from "./XPathParser";

import { NodeHandler } from "../common/Node/NodeHandler";
import { PredicateHandler } from "./handlers/Predicate/PredicateHandler";
import { Token } from "../common/Token";

const parser = new XPathParser();

parser.addHandler(new NodeHandler());
parser.addHandler(new PredicateHandler());

export class XPath {
  private xpathString: string;
  private parser: XPathParser;

  private path: Token[];

  constructor(xpath: string = "", currentParser = parser) {
    this.xpathString = xpath.trim();
    this.parser = currentParser;
  }

  getPath() {
    return this.path;
  }

  parse() {
    const path: Token[] = this.parser.parse(this.xpathString);

    return (this.path = path);
  }
}
