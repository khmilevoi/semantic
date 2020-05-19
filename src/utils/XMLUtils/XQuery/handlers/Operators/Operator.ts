import { TNode } from "utils/XMLUtils/XMLDocument";

export class Operator {
  static regexp: RegExp;

  static verify(token: string) {
    return !!this.regexp && this.regexp.test(token);
  }

  static createOperator<T extends Operator>(token: string): T | Operator {
    if (this === Operator.constructor) {
      throw new Error("This is abstract class");
    } else {
      return new this(token);
    }
  }

  private operator: string;

  constructor(token: string) {
    this.operator = token;
  }

  getOrder() {
    return Infinity;
  }

  getOperator() {
    return this.operator;
  }

  execute(left: any, right: any): number | boolean {
    throw new Error("Must be defined");
  }
}
