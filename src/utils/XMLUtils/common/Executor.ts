import { XMLDocument, TNode } from "../XMLDocument";

export abstract class Executor<S, T> {
  execute(xml: S, path: T): XMLDocument {
    throw new Error("Method must be defined");
  }
}
