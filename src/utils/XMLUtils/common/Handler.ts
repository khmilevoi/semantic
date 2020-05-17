import { Token } from "./Token";

export abstract class Handler {
  regexp: RegExp;

  verify(token: string) {
    return this.regexp.test(token);
  }

  parse(token: string): Token {
    throw new Error("Method must be declared");
  }

  nextState(token: string): string {
    throw new Error("Method must be declared");
  }
}
