import { Operator } from "./Operator";

export class StrictGreaterThan extends Operator {
  static regexp = /^>/;

  execute() {
    return null;
  }
}
