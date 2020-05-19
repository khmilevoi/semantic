import { XQueryParser, TTree } from "./XQueryParser";

import { FunctionHandler } from "./handlers/Function/FunctionHandler";
import { BracketsHandler } from "./handlers/Brackets/BracketsHandler";
import { OperatorsHandler } from "./handlers/Operators/OperatorsHandler";
import { AttributeHandler } from "./handlers/Attribute/AttributeHandler";
import { Plus } from "./handlers/Operators/Plus";
import { NodeHandler } from "../common/Node/NodeHandler";
import { NumberHandler } from "./handlers/Number/NumberHandler";

import { Minus } from "./handlers/Operators/Minus";
import { Multi } from "./handlers/Operators/Multi";
import { Div } from "./handlers/Operators/Div";
import { Equal } from "./handlers/Operators/Equal";
import { NotEqual } from "./handlers/Operators/NotEqual";
import { StrictLessThen } from "./handlers/Operators/StrictLessThan";
import { LessThen } from "./handlers/Operators/LessThan";
import { StrictGreaterThan } from "./handlers/Operators/StrictGreaterThan";
import { GreaterThan } from "./handlers/Operators/GreaterThan";
import { Or } from "./handlers/Operators/Or";
import { And } from "./handlers/Operators/And";
import { Mod } from "./handlers/Operators/Mod";

import { Expression } from "./Expression";
import { XMLDocument, Tag, TNode } from "../XMLDocument";
import { XQueryExecutor } from "./XQueryExecutor";
import { NodeToken } from "./handlers/Node/NodeToken";

const parser = new XQueryParser();

parser.addHandler(new FunctionHandler());
parser.addHandler(new BracketsHandler());
parser.addHandler(
  new OperatorsHandler()
    .addOperator(Plus)
    .addOperator(Minus)
    .addOperator(Multi)
    .addOperator(Div)
    .addOperator(Equal)
    .addOperator(NotEqual)
    .addOperator(StrictLessThen)
    .addOperator(LessThen)
    .addOperator(StrictGreaterThan)
    .addOperator(GreaterThan)
    .addOperator(Or)
    .addOperator(And)
    .addOperator(Mod)
);
parser.addHandler(new AttributeHandler());
parser.addHandler(new NumberHandler());
parser.addHandler(new NodeHandler(NodeToken));

const executor = new XQueryExecutor();

export class XQuery {
  private xPathString: string;
  private parser: XQueryParser;
  private executor: XQueryExecutor;

  private tree: TTree;
  private root: Expression;

  constructor(
    xpath: string = "",
    customParser = parser,
    customExecutor = executor
  ) {
    this.xPathString = xpath.trim();
    this.parser = customParser;
    this.executor = customExecutor;
  }

  getRoot() {
    return this.root;
  }

  parse() {
    const tree: TTree = this.parser.parse(this.xPathString);

    this.tree = tree;
    this.root = tree.root;

    return this.tree;
  }

  execute(source: TNode[]): XMLDocument {
    if (!this.root) {
      throw new Error("Need to call parse");
    }

    // @ts-ignore
    const tags: Tag[] = source.filter((item) => item instanceof Tag);

    return this.executor.execute(tags, this.tree);
  }
}
