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
import { AND } from "./handlers/Operators/And";
import { Mod } from "./handlers/Operators/Mod";

import { Expression } from "./Expression";

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
    .addOperator(AND)
    .addOperator(Mod)
);
parser.addHandler(new AttributeHandler());
parser.addHandler(new NumberHandler());
parser.addHandler(new NodeHandler());

export class XQuery {
  private xPathString: string;
  private parser: XQueryParser;

  private tree: TTree;
  private root: Expression;

  constructor(xpath: string = "", currentParser: XQueryParser = parser) {
    this.xPathString = xpath.trim();
    this.parser = currentParser;
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
}
