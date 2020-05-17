export class Node {
  private id: symbol;

  constructor(id: string) {
    this.id = Symbol.for(id.slice(0, 20));
  }

  getId() {
    return this.id;
  }

  clone() {
    return new Node(Symbol.keyFor(this.id));
  }
}
