import { Function, TParams } from "../Function";

export class Name extends Function {
  static regexp = /^name/;

  calc({ tag }: TParams) {
    return tag.getName();
  }
}
