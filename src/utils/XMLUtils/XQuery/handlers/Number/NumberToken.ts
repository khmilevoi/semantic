import { Token } from "../../../common/Token";

export class NumberToken extends Token {
  static type = "number";

  constructor(token) {
    super(NumberToken.type, token);
  }

  execute() {
    return Number.parseFloat(this.getContent());
  }
}
