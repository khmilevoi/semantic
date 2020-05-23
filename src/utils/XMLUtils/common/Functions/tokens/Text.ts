import { Text as TextNode } from "../../../XMLDocument";
import { Function, TParams } from "../Function";

export class Text extends Function {
  static regexp = /^text/;

  calc({ tag }: TParams) {
    return tag
      .getChildren()
      .filter((item): item is TextNode => item instanceof TextNode);
  }
}
