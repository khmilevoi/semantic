import { Token } from "utils/XMLUtils/common/Token";
import { Tag, Text } from "utils/XMLUtils/XMLDocument";

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

      case "text": {
        const [separator = ""] = this.params;

        return tag
          .getChildren()
          .filter((item) => item instanceof Text)
          .map((item: Text) => item.getText())
          .join(separator);
      }

      case "string": {
        return this.params.join("");
      }

      case "include": {
        const [symbol = ""] = this.params;

        return tag
          .getChildren()
          .filter((item) => item instanceof Text)
          .map((item: Text) => item.getText())
          .join("")
          .includes(symbol);
      }

      default: {
        return 0;
      }
    }
  }
}
