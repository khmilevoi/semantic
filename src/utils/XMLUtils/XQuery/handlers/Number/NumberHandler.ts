import { NumberToken } from "./NumberToken";
import { Handler } from "utils/XMLUtils/common/Handler";

export class NumberHandler extends Handler<NumberToken> {
  regexp = /\d+/;

  parse(token: string) {
    return new NumberToken(token);
  }
}
