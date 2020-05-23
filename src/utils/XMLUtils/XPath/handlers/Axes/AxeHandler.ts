import { CombinedHandler } from "utils/XMLUtils/common/CombinedHandler";
import { Axe } from "./Axe";

export class AxeHandler extends CombinedHandler<Axe> {
  regexp = /^\S+::\S+$/;
}
