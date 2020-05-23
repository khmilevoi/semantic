export class Node {
  private id: symbol;

  constructor(id: string) {
    this.id = Symbol(id.slice(0, 20));
  }

  getId() {
    return this.id;
  }

  clone() {
    return new Node(this.id.toString().slice(7, -1));
  }

  getChildren() {
    return [];
  }
}
