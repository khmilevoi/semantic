import { Handler } from "utils/XMLUtils/common/Handler";
import { FunctionToken } from "./FunctionToken";

import { types } from "../../constants/types";

export class FunctionHandler extends Handler<FunctionToken> {
  regexp = /\w+\([^\)]*\)(\.[^\)]*\))?/;

  parse(token: string) {
    const [name, params] = token.replace(")", "").split("(");

    const func = new FunctionToken(
      token,
      name,
      params
        .split(",")
        .map((item) => item.trim())
        .filter((item) => !!item)
    );

    return func;
  }
}
