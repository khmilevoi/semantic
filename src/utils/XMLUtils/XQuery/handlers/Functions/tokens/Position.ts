import { Function } from "../Function";

export class Position extends Function {
  static regexp = /^position/;

  calc({ args }) {
    const [index] = args;

    return index;
  }
}
