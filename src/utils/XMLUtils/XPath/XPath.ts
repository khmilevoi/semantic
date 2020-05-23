import { XPathParser } from "./XPathParser";

import { Token } from "../common/Token";

import { XMLDocument, Tag } from "../XMLDocument";
import { XPathExecutor } from "./XPathExecutor";

import { NodeHandler } from "../common/Node/NodeHandler";
import { PredicateHandler } from "./handlers/Predicate/PredicateHandler";
import { AxeHandler } from "./handlers/Axes/AxeHandler";
import { FunctionHandler } from "../common/Functions/FunctionHandler";

import { PrecedingSibling } from "./handlers/Axes/tokens/PrecedingSibling";

import { Node } from "../common/Functions/tokens/Node";

const parser = new XPathParser();

parser.addHandler(new FunctionHandler().addToken(Node));
parser.addHandler(new AxeHandler().addToken(PrecedingSibling));
parser.addHandler(new NodeHandler());
parser.addHandler(new PredicateHandler());

const executor = new XPathExecutor();

export class XPath {
  private xpathString: string;
  private parser: XPathParser;
  private executor: XPathExecutor;

  private root: Token[];

  constructor(
    xpath: string = "",
    customParser = parser,
    customExecutor = executor
  ) {
    this.xpathString = xpath.trim();
    this.parser = customParser;
    this.executor = customExecutor;
  }

  getRoot() {
    return this.root;
  }

  parse() {
    const path: Token[] = this.parser.parse(this.xpathString);

    return (this.root = path);
  }

  execute(source: XMLDocument | Tag): XMLDocument {
    if (!this.root) {
      throw new Error("Need to call parse");
    }

    if (source instanceof Tag) {
      return this.executor.execute(source, this.root);
    } else if (source instanceof XMLDocument) {
      return this.executor.execute(source.getRoot(), this.root);
    }

    throw new Error("Incorrect source type");
  }
}
