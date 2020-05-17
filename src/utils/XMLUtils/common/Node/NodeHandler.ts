import { NodeToken } from "./NodeToken";

import { Handler } from "../Handler";

export class NodeHandler extends Handler<NodeToken> {
  regexp = new RegExp(/^\w+$/);

  parse(token: string) {
    return new NodeToken(token);
  }
}
