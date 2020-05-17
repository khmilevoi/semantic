import { XPathParser } from "./XPathParser";

import { NodeHandler } from "./handlers/Node/NodeHandler";
import { PredicateHandler } from "./handlers/Predicate/PredicateHandler";

const parser = new XPathParser();

parser.addHandler(new NodeHandler());
parser.addHandler(new PredicateHandler());

export class XPath {
  private xpathString: string;
  private parser: XPathParser;

  constructor(xpath: string = "", currentParser = parser) {
    this.xpathString = xpath.trim();
    this.parser = currentParser;
  }

  parse() {
    return this.parser.parse(this.xpathString);
  }
}
