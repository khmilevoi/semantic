import { Axe } from "../Axe";
import { Tag, TNode } from "utils/XMLUtils/XMLDocument";

export class PrecedingSibling extends Axe {
  static regexp = /^preceding-sibling/;

  calc(tag: Tag, prev: TNode[]) {
    const current = prev.findIndex((item) => item.getId() === tag.getId());

    return prev.filter((_, index) => index < current);
  }
}
