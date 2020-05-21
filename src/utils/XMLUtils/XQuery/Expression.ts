import { Token } from "../common/Token";

import { Operator } from "./handlers/Operators/Operator";
import { Tag, TNode } from "../XMLDocument";

type Params = {
  rewrite?: boolean;
  args?: any[];
};

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

  prepare(token: Expression | Token, tag, ...args) {
    return this.operator
      ? this.operator.prepare(token)
      : token.execute(tag, ...args);
  }

  execute(tag: Tag, params: Params = {}): number | boolean {
    const { rewrite } = params;

    if (this.result != null && !rewrite) {
      return this.result;
    }

    const child = this.child && this.prepare(this.child, tag, params);
    const next = this.next && this.prepare(this.next, tag, params);
    const result =
      this.operator && this.operator.execute(child, next, tag, params);

    if (result != null) {
      this.result = result;

      return result;
    }

    return child == null ? next : child;
  }
}
