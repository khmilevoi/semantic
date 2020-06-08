import { Function, TParams } from "../Function";
import { XMLDocument } from "../../../XMLDocument";

export class Count extends Function {
  static regexp = /^count/;

  calc({ params }: TParams) {
    const [query] = params;

    if (query instanceof XMLDocument) {
      return query.getRoot().getChildren().length;
    }

    throw new Error("Incorrect signature");
  }
}
