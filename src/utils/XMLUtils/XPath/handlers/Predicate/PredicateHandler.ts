import { Handler } from "../../../common/Handler";

import { PredicateToken } from "./PredicateToken";

export class PredicateHandler extends Handler {
  regexp = /^\[.*\]$/;

  parse(token: string) {
    const predicate = new PredicateToken(token);
    predicate.parse();

    return predicate;
  }
}
