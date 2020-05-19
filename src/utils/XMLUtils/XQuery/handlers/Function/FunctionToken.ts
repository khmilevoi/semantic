import { Token } from "utils/XMLUtils/common/Token";
import { Tag } from "utils/XMLUtils/XMLDocument";

export class FunctionToken extends Token {
  static type = "function";

  private name: string;
  private params: string[] = [];

  constructor(token: string, name: string, params: string[]) {
    super(FunctionToken.type, token);

    this.name = name;
    this.params = params;
  }

  execute(tag: Tag, { args = [] }) {
    switch (this.name) {
      case "position": {
        const [index] = args;

        return index;
      }

      default: {
        return 0;
      }
    }
  }
}
