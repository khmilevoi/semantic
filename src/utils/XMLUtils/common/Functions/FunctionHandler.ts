import { CombinedHandler } from "../CombinedHandler";
import { Function } from "./Function";

export class FunctionHandler extends CombinedHandler<Function> {
  regexp = /^\w+\(.*\)$/;
}
