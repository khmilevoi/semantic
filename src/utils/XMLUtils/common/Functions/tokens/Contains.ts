import { Function, TParams } from "../Function";

export class Contains extends Function {
  static regexp = /^contains/;

  calc({ params }: TParams) {
    const [item = "", searchString = ""]: string[] = params;

    if(!item) {
      debugger
    }

    return item.includes(searchString);
  }
}
