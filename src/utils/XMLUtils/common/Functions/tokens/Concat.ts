import { Function, TParams } from "../Function";
import { Text } from "../../../XMLDocument";

export class Concat extends Function {
  static regexp = /^concat/;

  calc({ params = [] }: TParams) {
    const text = params.join("");

    return [new Text(text)];
  }
}
