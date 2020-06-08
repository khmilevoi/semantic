import { Token } from "../../../common/Token";

export class Axe extends Token {
  static type = "function";

  static regexp: RegExp;

  static verify(token: string) {
    return !!this.regexp && this.regexp.test(token);
  }

  static createToken<T extends Axe>(token: string): T | Axe {
    if (this === Axe.constructor) {
      throw new Error("This is abstract class");
    } else {
      return new this(token);
    }
  }

  private name: string;
  private node: string;

  constructor(token: string) {
    super(Axe.type, token);

    const [name, test] = token.split("::");

    this.name = name;
    this.node = test;
  }

  calc(...args): any {
    throw new Error("Must ne defined");
  }

  getName() {
    return this.name;
  }

  getNode() {
    return this.node;
  }

  execute(...args) {
    return this.calc(...args);
  }
}
