import { Handler } from "../../../common/Handler";

import { NodeToken } from "./NodeToken";

export class NodeHandler extends Handler {
  regexp = new RegExp(/^\w+$/);

  parse(token: string) {
    return new NodeToken(token);
  }
}
