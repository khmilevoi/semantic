import { Token } from "utils/XMLUtils/common/Token";

export class NumberToken extends Token {
  static type = "number";

  constructor(token) {
    super(NumberToken.type, +token);
  }
}
