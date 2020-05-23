import { Token } from "utils/XMLUtils/common/Token";
import { Tag, Text } from "utils/XMLUtils/XMLDocument";
import { XQuery } from "../../XQuery";
import { XPath } from "utils/XMLUtils/XPath";

export type TParams = {
  tag?: Tag;
  params?: any[];
  args?: any[];
};

export class Function extends Token {
  static type = "function";

  static regexp: RegExp;

  xpath = /(.+\/.*)+/;

  static verify(token: string) {
    return !!this.regexp && this.regexp.test(token);
  }

  static createToken<T extends Function>(token: string): T | Function {
    if (this === Function.constructor) {
      throw new Error("This is abstract class");
    } else {
      return new this(token);
    }
  }

  private name: string;
  private params: string[] = [];

  constructor(token: string) {
    super(Function.type, token);

    const [name, params] = token.slice(0, -1).split("(");

    this.name = name;
    this.params = params
      .split(",")
      .map((item) => item.trim())
      .filter((item) => !!item);
  }

  getName() {
    return this.name;
  }

  getParams() {
    return this.params;
  }

  calc(params: TParams): any {
    throw new Error("Must ne defined");
  }

  createQuery(item: string) {
    if (this.xpath.test(item)) {
      return new XPath(item);
    }

    return new XQuery(item);
  }

  execute(tag: Tag, { args = [] }) {
    const params = this.params
      .map((item) => {
        const query = this.createQuery(item);
        query.parse();

        return query;
      })
      .map((query) => {
        if (query instanceof XQuery) {
          return query.calc(tag, ...args);
        }

        return query.execute(tag);
      });

    const result = this.calc({ tag, params, args });

    return result;
  }
}
