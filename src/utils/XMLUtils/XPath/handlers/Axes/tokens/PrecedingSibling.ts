import { Axe } from "../Axe";
import { Tag } from "../../../../XMLDocument";

export class PrecedingSibling extends Axe {
  static regexp = /^preceding-sibling/;

  calc(tag: Tag, prev: Tag) {
    const current = prev
      .getChildren()
      .findIndex((item) => item.getId() === tag.getId());

    return prev
      .getChildren()
      .filter((_, index) => index < current)
      .filter((item): item is Tag => item instanceof Tag)
      .filter((item) => {
        if (this.getNode() === "*") {
          return true;
        }

        return item.getName() === this.getNode();
      });
  }
}
