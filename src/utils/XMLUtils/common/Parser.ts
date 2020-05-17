import { Handler } from "./Handler";

export abstract class Parser {
  private handlers: Handler[] = [];

  getHandlers() {
    return this.handlers;
  }

  addHandler(handler: Handler) {
    return this.handlers.push(handler);
  }

  splitString(source: string, save?: boolean) {
    const combined = Object.values<RegExp>(this.SPLITTER)
      .map((regexp) => regexp.source)
      .join("|");
    const splitter = new RegExp(save ? `(${combined})` : combined);

    return source.split(splitter);
  }

  SPLITTER = {};
}
