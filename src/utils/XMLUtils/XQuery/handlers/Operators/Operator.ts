import { Tag } from "../../../XMLDocument";
import { Token } from "../../../common/Token";
import { Expression } from "../../Expression";

export class Operator extends Token {
  static type = "operator";

  static regexp: RegExp;

  static verify(token: string) {
    return !!this.regexp && this.regexp.test(token);
  }

  static createToken(token: string): Operator {
    if (this === Operator.constructor) {
      throw new Error("This is abstract class");
    } else {
      return new this(token);
    }
  }

  private operator: string;

  constructor(token: string) {
    super(Operator.type, token);

    this.operator = token;
  }

  getOrder() {
    return Infinity;
  }

  getOperator() {
    return this.operator;
  }

  calc(left, right): any {
    throw new Error("Must ne defined");
  }

  parseToken(token, tag, params): string {
    if (token instanceof Token || token instanceof Expression) {
      return token.execute(tag, params);
    }

    return token;
  }

  execute(
    left: Token | Expression | number,
    right: Token | Expression | number,
    tag: Tag,
    params
  ) {
    const executedLeft = this.parseToken(left, tag, params);

    if (right instanceof Expression && right.getResult() == null) {
      const child = right.getChild().execute(tag, params);
      const result = this.calc(executedLeft, child);

      if (right.getNext() && right.getOperator()) {
        const next = right.getNext().execute(tag, params);
        const nextResult = right
          .getOperator()
          .execute(result, next, tag, params);

        return nextResult;
      }

      return result;
    }

    const executedRight = this.parseToken(right, tag, params);

    return this.calc(executedLeft, executedRight);
  }

  prepare(token: Token | Expression) {
    return token;
  }
}
