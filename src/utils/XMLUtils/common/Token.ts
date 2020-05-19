import { TNode } from "../XMLDocument";

export class Token {
  private type: string;
  private content: string;

  constructor(type: string, content = "") {
    this.type = type;
    this.content = content;
  }

  getType() {
    return this.type;
  }

  getContent() {
    return this.content;
  }

  execute(tag?: TNode, params: Object = {}): TNode[] | any {
    throw new Error(`Must be defined [${this.type}]`);
  }
}
