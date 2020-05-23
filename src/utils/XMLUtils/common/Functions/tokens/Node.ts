import { Function, TParams } from "../Function";

export class Node extends Function {
  static regexp = /^node/;

  calc({ tag }: TParams) {
    return tag.findAll();
  }
}
