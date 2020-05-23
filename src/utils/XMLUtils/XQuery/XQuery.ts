import { XQueryParser, TTree } from "./XQueryParser";

import { NodeHandler } from "../common/Node/NodeHandler";

import { Expression } from "./Expression";
import { XMLDocument, Tag, TNode } from "../XMLDocument";
import { XQueryExecutor } from "./XQueryExecutor";

import { FunctionHandler } from "../common/Functions/FunctionHandler";
import { BracketsHandler } from "./handlers/Brackets/BracketsHandler";
import { OperatorsHandler } from "./handlers/Operators/OperatorsHandler";
import { AttributeHandler } from "./handlers/Attribute/AttributeHandler";
import { NumberHandler } from "./handlers/Number/NumberHandler";
import { StringHandler } from "./handlers/String/StringHandler";

import { NodeToken } from "./handlers/Node/NodeToken";

import { Plus } from "./handlers/Operators/tokens/Plus";
import { Minus } from "./handlers/Operators/tokens/Minus";
import { Multi } from "./handlers/Operators/tokens/Multi";
import { Div } from "./handlers/Operators/tokens/Div";
import { Equal } from "./handlers/Operators/tokens/Equal";
import { NotEqual } from "./handlers/Operators/tokens/NotEqual";
import { StrictLessThen } from "./handlers/Operators/tokens/StrictLessThan";
import { LessThen } from "./handlers/Operators/tokens/LessThan";
import { StrictGreaterThan } from "./handlers/Operators/tokens/StrictGreaterThan";
import { GreaterThan } from "./handlers/Operators/tokens/GreaterThan";
import { Or } from "./handlers/Operators/tokens/Or";
import { And } from "./handlers/Operators/tokens/And";
import { Mod } from "./handlers/Operators/tokens/Mod";

import { Position } from "../common/Functions/tokens/Position";
import { Count } from "../common/Functions/tokens/Count";
import { Contains } from "../common/Functions/tokens/Contains";
import { Name } from "../common/Functions/tokens/Name";

const parser = new XQueryParser();

parser.addHandler(
  new FunctionHandler()
    .addToken(Position)
    .addToken(Contains)
    .addToken(Count)
    .addToken(Name)
);
parser.addHandler(
  new OperatorsHandler()
    .addToken(Plus)
    .addToken(Minus)
    .addToken(Multi)
    .addToken(Div)
    .addToken(Equal)
    .addToken(NotEqual)
    .addToken(StrictLessThen)
    .addToken(LessThen)
    .addToken(StrictGreaterThan)
    .addToken(GreaterThan)
    .addToken(Or)
    .addToken(And)
    .addToken(Mod)
);
parser.addHandler(new AttributeHandler());
parser.addHandler(new NumberHandler());
parser.addHandler(new StringHandler());
parser.addHandler(new NodeHandler(NodeToken));
parser.addHandler(new BracketsHandler());

const executor = new XQueryExecutor();

export class XQuery {
  private xQueryString: string;
  private parser: XQueryParser;
  private executor: XQueryExecutor;

  private tree: TTree;
  private root: Expression;

  constructor(
    xpath: string = "",
    customParser = parser,
    customExecutor = executor
  ) {
    this.xQueryString = xpath.trim();
    this.parser = customParser;
    this.executor = customExecutor;
  }

  getRoot() {
    return this.root;
  }

  parse() {
    const tree: TTree = this.parser.parse(this.xQueryString);

    this.tree = tree;
    this.root = tree.root;

    return this.tree;
  }

  execute(source: TNode[] | XMLDocument): XMLDocument {
    if (!this.root) {
      throw new Error("Need to call parse");
    }

    const list = Array.isArray(source)
      ? source
      : source.getRoot().getChildren();

    const tags: Tag[] = list.filter((item): item is Tag => item instanceof Tag);

    return this.executor.execute(tags, this.tree);
  }

  calc(tag?: Tag | XMLDocument, ...args) {
    if (!this.root) {
      throw new Error("Need to call parse");
    }

    if (tag instanceof XMLDocument) {
      return this.executor.calc(this.tree, tag.getRoot(), ...args);
    }

    return this.executor.calc(this.tree, tag, ...args);
  }
}
