import { Token } from "../common/Token";

import { Operator } from "./handlers/Operators/Operator";

export class Expression {
  private child: Expression | Token;
  private operator: Operator;
  private next?: Expression;

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
}
