import { CombinedHandler } from "utils/XMLUtils/common/CombinedHandler";
import { Function } from "./Function";

export class FunctionHandler extends CombinedHandler<Function> {
  regexp = /^\w+\(.*\)$/;
}
