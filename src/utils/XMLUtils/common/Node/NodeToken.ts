import { Token } from "../Token";
import { Tag } from "utils/XMLUtils/XMLDocument";

export class NodeToken extends Token {
  static type = "node";

  constructor(node: string) {
    super(NodeToken.type, node);
  }

  execute(tag: Tag) {
    return tag.findAll(this.getContent(), false);
  }
}
