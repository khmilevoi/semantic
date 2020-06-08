import { NumberToken } from "./NumberToken";
import { Handler } from "../../../common/Handler";

export class NumberHandler extends Handler<NumberToken> {
  regexp = /^\d+\.?\d*$/;

  parse(token: string) {
    return new NumberToken(token);
  }
}
