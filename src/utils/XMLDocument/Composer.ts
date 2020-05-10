import { createExecutor } from "./createExecutor";
import { XMLDocument, TNode } from "./XMLDocument";
import { Tag } from "./Tag";
import { Text } from "./Text";

export class Composer {
  private xml: XMLDocument;
  private xsl: XMLDocument;
  private composed: XMLDocument;

  constructor(xml: XMLDocument, xsl: XMLDocument) {
    this.xml = xml;
    this.xsl = xsl;
    this.composed = null;
  }

  verify(item, name) {
    return true;
  }

  createTag(node: Tag): Tag {
    const tag = node.clone();

    return tag;
  }

  parsePath(path: string) {
    return path.split("/").filter((item) => !!item);
  }

  getNodeByPath(path: string, node = this.xml.getRoot()): [Tag, string] {
    if (!this.verify(path, "path")) {
      throw new Error(`Incorrect syntax of path [${path}]`);
    }

    const parsedPath = this.parsePath(path);

    const first = parsedPath.shift();
    const last = parsedPath.pop();
    const firstNode = node.find(first, false);
    const goal = parsedPath.reduce<Tag>(
      (current, name) => current && current.find(name),
      firstNode
    );

    return [goal, last];
  }

  createInstruction(
    node: Tag,
    name: string,
    root: Tag,
    saved?: Tag
  ): Tag | TNode[] {
    const path = node.getProp("select");

    if (Composer.types.FOR_EACH(name)) {
      const [goal, last] = this.getNodeByPath(path, saved);

      if (!goal) {
        throw new Error(`Incorrect path [${node.getName()}]`);
      }

      const sequence = goal.findAll(last, false);

      const rootClone = root.clone();

      sequence.forEach((item) =>
        node
          .getChildren()
          .forEach((child) => this.composeChild(rootClone, child, item))
      );

      return rootClone.getChildren();
    }

    if (Composer.types.VALUE_OF(name)) {
      const [goal, last] = this.getNodeByPath(path, saved);

      if (!goal) {
        throw new Error(`Incorrect path [${node.getName()}]`);
      }

      const item = goal.find(last);

      const text = goal.getChildren().filter((child) => child instanceof Text);

      return text;
    }

    return this.createTag(node);
  }

  parseName(name: string) {
    if (Composer.types.INSTRUCTION(name)) {
      return [name.replace(Composer.regexps.INSTRUCTION, ""), true];
    }

    return [name, false];
  }

  createChild(node: Tag, root: Tag, saved?: Tag) {
    const [name, isInstruction] = this.parseName(node.getName());

    if (isInstruction) {
      const instruction = this.createInstruction(
        node,
        name.toString(),
        root,
        saved
      );

      return instruction;
    } else {
      const tag = this.createTag(node);

      return tag;
    }
  }

  composeChild(root: Tag, node: TNode, saved?: Tag) {
    if (node instanceof Tag) {
      const child = this.createChild(node, root, saved);

      if (Array.isArray(child)) {
        root.addChild(...child);
      } else {
        root.addChild(child);

        node
          .getChildren()
          .forEach((next) => this.composeChild(child, next, saved));
      }
    } else if (node instanceof Text) {
      root.addChild(node);
    } else {
      throw new Error("Incorrect token");
    }
  }

  compose() {
    this.composed = new XMLDocument();
    this.composed.parse();

    const schema = this.xsl.find("html");
    const root = schema.clone();

    this.composed.setRoot(root);

    schema.getChildren().forEach((node) => this.composeChild(root, node));

    return this.composed;
  }

  static regexps = {
    INSTRUCTION: /xsl:/,
    FOR_EACH: /for-each/,
    VALUE_OF: /value-of/,
  };

  static types = createExecutor(Composer.regexps);
}
