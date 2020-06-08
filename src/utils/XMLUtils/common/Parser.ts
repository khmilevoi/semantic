import { Handler } from "./Handler";

import { combineRegExp } from "./combineRegExp";

export abstract class Parser<T> {
  private handlers: Handler<T>[] = [];

  getHandlers() {
    return this.handlers;
  }

  addHandler(handler: Handler<T>) {
    return this.handlers.push(handler);
  }

  static splitString(source: string, save?: boolean) {
    const splitter = combineRegExp(Object.values<RegExp>(this.SPLITTER), save);

    return source
      .split(new RegExp(splitter, "g"))
      .filter((item) => !!item)
      .map((item) => item.trim());
  }

  static SPLITTER = {};
}
