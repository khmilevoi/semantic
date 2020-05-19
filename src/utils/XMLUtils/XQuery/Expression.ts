import { Token } from "../common/Token";

import { Operator } from "./handlers/Operators/Operator";
import { Tag, TNode } from "../XMLDocument";

export class Expression {
  private child: Expression | Token;
  private operator: Operator;
  private next?: Expression | Token;
  private result: any = null;

  constructor(
    token?: Expression | Token,
    operator?: Operator,
    next?: Expression
  ) {
    this.child = token;
    this.operator = operator;
    this.next = next;
  }

  getChild() {
    return this.child;
  }

  setChild(token: Expression | Token) {
    return (this.child = token);
  }

  getResult() {
    return this.result;
  }

  getOperator() {
    return this.operator;
  }

  setOperator(operator: Operator) {
    return (this.operator = operator);
  }

  getNext() {
    return this.next;
  }

  setNext(next: Expression) {
    return (this.next = next);
  }

  execute(tag: Tag, params): number | boolean {
    const { rewrite } = params;

    // debugger;
    if (this.result != null && !rewrite) {
      return this.result;
    }

    const child = this.child && this.child.execute(tag, params);
    const next = this.next && this.next.execute(tag, params);
    const result = this.operator && this.operator.execute(child, next);

    // debugger;

    if (this.operator) {
      this.result = result;

      return result;
    }

    return child || next;
  }
}
