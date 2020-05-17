export abstract class Token {
  private type: string;
  private content: string;

  constructor(type: string, content) {
    this.type = type;
    this.content = content;
  }
}
