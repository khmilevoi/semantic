import { XQueryParser } from "./XQueryParser";

import { BracketsHandler } from "./handlers/Brackets/BracketsHandler";

const parser = new XQueryParser();
parser.addHandler(new BracketsHandler());

export class XQuery {
  private xPathString: string;
  private parser: XQueryParser;

  constructor(xpath: string = "", currentParser = parser) {
    this.xPathString = xpath.trim();
    this.parser = currentParser;
  }

  parse() {
    return this.parser.parse(this.xPathString);
  }
}
