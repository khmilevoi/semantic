import { Tag, Text } from "utils/XMLUtils/XMLDocument";
import { Token } from "utils/XMLUtils/common/Token";

export class NodeToken extends Token {
  static type = "node";

  constructor(token: string) {
    super(NodeToken.type, token);
  }

  execute(tag: Tag): string {
    const element = tag.find(this.getContent());

    if (!element) {
      debugger;
    }

    return element
      .getChildren()
      .filter((item) => item instanceof Text)
      .map((item) => {
        if (item instanceof Text) {
          return item.getText();
        }

        return "";
      })
      .join("");
  }
}
