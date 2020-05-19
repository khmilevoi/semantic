import { NodeToken } from "./NodeToken";

import { Handler } from "../Handler";
import { Token } from "../Token";

export class NodeHandler<T> extends Handler<NodeToken> {
  regexp = new RegExp(/^\w+$/);

  private NodeConstructor: typeof Token;

  constructor(NodeConstructor?: typeof Token) {
    super();

    this.NodeConstructor = NodeConstructor || NodeToken;
  }

  parse(token: string) {
    return new this.NodeConstructor(token);
  }
}
