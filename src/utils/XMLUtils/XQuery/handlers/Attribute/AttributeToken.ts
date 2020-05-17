import { Token } from "utils/XMLUtils/common/Token";

export class AttributeToken extends Token {
  static type = "attribute";

  constructor(token: string) {
    super(AttributeToken.type, token);
  }
}
