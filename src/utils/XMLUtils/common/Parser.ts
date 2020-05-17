import { Handler } from "./Handler";

import { combineRegExp } from "./combineRegExp";
import { Token } from "./Token";

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

    return source.split(splitter);
  }

  static SPLITTER = {};
}
