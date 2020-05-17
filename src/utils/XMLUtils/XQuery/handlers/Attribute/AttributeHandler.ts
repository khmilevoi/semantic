import { Handler } from "utils/XMLUtils/common/Handler";
import { AttributeToken } from "./AttributeToken";

export class AttributeHandler extends Handler<AttributeToken> {
  regexp = /^@\w+/;

  parse(token: string) {
    return new AttributeToken(token.replace("@", ""));
  }
}
