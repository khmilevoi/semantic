import { Token } from "../../../common/Token";

export class NodeToken extends Token {
  static type = "node";

  constructor(node: string) {
    super(NodeToken.type, node);
  }
}
