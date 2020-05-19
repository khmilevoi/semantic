import { Token } from "utils/XMLUtils/common/Token";
import { Tag } from "utils/XMLUtils/XMLDocument";

export class AttributeToken extends Token {
  static type = "attribute";

  constructor(token: string) {
    super(AttributeToken.type, token);
  }

  execute(tag: Tag) {
    return tag.getProp(this.getContent());
  }
}
