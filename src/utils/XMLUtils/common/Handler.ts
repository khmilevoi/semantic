export abstract class Handler<T> {
  regexp: RegExp;

  verify(token: string) {
    return this.regexp.test(token);
  }

  parse(token: string): T {
    throw new Error("Method must be declared");
  }
}
