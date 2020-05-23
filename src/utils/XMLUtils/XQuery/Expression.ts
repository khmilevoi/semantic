import { Token } from "../common/Token";

import { Operator } from "./handlers/Operators/Operator";
import { Tag, TNode } from "../XMLDocument";
import { MAX_ORDER } from "./constants/orders";

type Params = {
  rewrite?: boolean;
  args?: any[];
};

export class Expression {
  private child: Expression | Token;
  private next?: Expression | Token;
  
  private operator: Operator;
  private deep: number = 0;
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

  setOperator(operator: Operator, deep?: number) {
    this.deep = deep;
    return (this.operator = operator);
  }

  getDeep() {
    return this.deep;
  }

  calcPriority(maxDeep: number) {
    if (this.operator) {
      const order = this.operator.getOrder() / MAX_ORDER;
      const deep = 1 - this.deep / maxDeep;

      return (order + deep) / 2;
    }

    return Infinity;
  }

  getNext() {
    return this.next;
  }

  setNext(next: Expression) {
    return (this.next = next);
  }

  prepare(token: Expression | Token, tag, ...args) {
    return (
      token &&
      (this.operator
        ? this.operator.prepare(token)
        : token.execute(tag, ...args))
    );
  }

  execute(tag: Tag, params: Params = {}): number | boolean | string {
    const { rewrite } = params;

    if (this.result != null && !rewrite) {
      return this.result;
    }

    const child = this.prepare(this.child, tag, params);
    const next = this.prepare(this.next, tag, params);
    const result =
      this.operator && this.operator.execute(child, next, tag, params);

    if (Number.isNaN(result)) {
      throw new Error(`Incorrect expression [${[result].join()}]`);
    }

    if (result != null) {
      this.result = result;

      return result;
    }

    return child == null ? next : child;
  }
}
