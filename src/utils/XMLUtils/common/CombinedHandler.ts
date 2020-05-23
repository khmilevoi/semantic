import { Handler } from "./Handler";

interface IExtendedToken<T> {
  verify(token: string): boolean;
  createToken(token: string): T;
}

export class CombinedHandler<T> extends Handler<T> {
  regexp: RegExp;

  tokens: IExtendedToken<T>[] = [];

  addToken(token: IExtendedToken<T>) {
    this.tokens.push(token);

    return this;
  }

  createToken(content: string) {
    return this.tokens.reduce<T>((result, token) => {
      if (!result && token.verify(content)) {
        const currentToken = token.createToken(content);

        return currentToken;
      }

      return result;
    }, null);
  }

  parse(token: string) {
    return this.createToken(token);
  }
}
