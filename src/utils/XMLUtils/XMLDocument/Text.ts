import { Node } from "./Node";

export class Text extends Node {
  private text: string;

  constructor(text: string) {
    super(text);

    this.text = text;
  }

  getText() {
    return this.text;
  }

  setText(text) {
    return (this.text = text);
  }

  getChildren() {
    return [this];
  }
}
