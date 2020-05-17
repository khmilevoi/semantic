import { Token } from "utils/XMLUtils/common/Token";

export class FunctionToken extends Token {
  static type = "function";

  private name: string;
  private params: string[] = [];

  constructor(token: string, name: string, params: string[]) {
    super(FunctionToken.type, token);

    this.name = name;
    this.params = params;
  }
}
