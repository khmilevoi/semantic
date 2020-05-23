import { Function, TParams } from "../Function";

export class Contains extends Function {
  static regexp = /^contains/;

  calc({ params }: TParams) {
    const [item = "", searchString = ""]: string[] = params;

    throw item.includes(searchString);
  }
}
