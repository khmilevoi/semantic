import { AttributeToken } from "./AttributeToken";
import { Handler } from "../../../common/Handler";

export class AttributeHandler extends Handler<AttributeToken> {
  regexp = /^@\w+/;

  parse(token: string) {
    return new AttributeToken(token.replace("@", ""));
  }
}
