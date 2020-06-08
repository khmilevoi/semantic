import { Handler } from "../../../common/Handler";
import { StringToken } from "./StringToken";

export class StringHandler extends Handler<StringToken> {
  regexp = /^'.*'$/;

  parse(token: string) {
    return new StringToken(token.slice(1, -1));
  }
}
