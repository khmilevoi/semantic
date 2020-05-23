import { Token } from "utils/XMLUtils/common/Token";

export class StringToken extends Token {
  static type = "string";

  constructor(token: string) {
    super(StringToken.type, token);
  }

  execute() {
    return this.getContent();
  }
}
