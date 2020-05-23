import { Function, TParams } from "../Function";

export class Node extends Function {
  static regexp = /^node/;

  calc({ tag }: TParams) {
    const res = tag.findAll();
    return res;
  }
}
