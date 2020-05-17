import { Handler } from "../../../common/Handler";
import { Token } from "../../../common/Token";

import { PredicateToken } from "./PredicateToken";

export class PredicateHandler extends Handler<Token> {
  regexp = /^\[.*\]$/;

  parse(token: string) {
    const predicate = new PredicateToken(token);
    predicate.parse();

    return predicate;
  }
}
