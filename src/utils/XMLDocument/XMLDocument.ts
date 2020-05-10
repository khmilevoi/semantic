import { Tag } from "./Tag";
import { Text } from "./Text";
import { createExecutor } from "./createExecutor";

export type TNode = Text | Tag;

type Tree = {
  root: Tag;
  nodes: Tag[];
};

export class XMLDocument {
  private xmlString: string;
  private tree: Tree;
  private root: Tag;

  private _tagState: string;

  constructor(xml: string = "") {
    this.xmlString = xml;
    this.tree = null;
    this.root = null;

    this._tagState = XMLDocument.tag.DEFAULT;
  }

  static handleError(inst) {
    if (!inst.tree) {
      throw new Error("Need to call parse");
    }
  }

  find(name: string): Tag {
    XMLDocument.handleError(this);

    return this.tree.nodes.find((tag) => {
      if (tag instanceof Tag) {
        return tag.getName() === name;
      }

      return false;
    });
  }

  findAll(name: string): Tag[] {
    XMLDocument.handleError(this);

    return this.tree.nodes.filter((tag) => {
      if (tag instanceof Tag) {
        return tag.getName() === name;
      }

      return false;
    });
  }

  getRoot() {
    return this.root;
  }

  setRoot(root: Tag, nodes = []) {
    XMLDocument.handleError(this);

    if (root instanceof Tag) {
      this.tree = { root, nodes };

      return (this.root = root);
    }

    throw new Error("The root must be a tag");
  }

  remove(node: TNode) {
    XMLDocument.handleError(this);

    const index = this.tree.nodes.findIndex(
      (tag) => tag.getId() === node.getId()
    );

    return this.tree.nodes.splice(index, 1);
  }

  static splitByTags(xmlString) {
    return xmlString
      .split(XMLDocument.regexps.SEPARATOR)
      .map((item) => item && item.trim())
      .filter((item) => !!item);
  }

  static verify(item, type) {
    return true;
  }

  static parsePropValue(value, next) {
    if (value == null || next === "=") {
      return "";
    }

    if (!this.verify(value, "prop")) {
      throw new Error("Incorrect prop value");
    }

    return value;
  }

  static parseTag(tagData) {
    const splitted = tagData
      .split(/(=)|"/)
      .map((item) => item && item.trim())
      .filter((item) => !!item);

    const tagNameAndFirstProp = splitted.shift();
    splitted.unshift(...tagNameAndFirstProp.split(" "));

    const tagName = splitted.shift();

    if (!this.verify(tagName, "tag")) {
      throw new Error("Incorrect tag name");
    }

    const props = {};

    while (splitted.length) {
      const [name, _, value] = splitted.splice(0, 3);
      const [next] = splitted;

      if (!this.verify(name, "tag")) {
        throw new Error("Incorrect prop name");
      }

      const parsedValue = XMLDocument.parsePropValue(value, next);

      props[name] = parsedValue;

      if (parsedValue === "" && value != null) {
        splitted.unshift(value);
      }
    }

    return [tagName, props];
  }

  nextTagState(item) {
    switch (item) {
      case XMLDocument.regexps.META_TAG: {
        return (this._tagState = XMLDocument.tag.META);
      }

      case XMLDocument.regexps.L_ANGLE: {
        return (this._tagState = XMLDocument.tag.OPENING);
      }

      case XMLDocument.regexps.CLOSE_TAG: {
        return (this._tagState = XMLDocument.tag.CLOSING);
      }

      case XMLDocument.regexps.CLOSE_SINGLE_TAG: {
        return (this._tagState = XMLDocument.tag.DEFAULT);
      }

      case XMLDocument.regexps.R_ANGLE: {
        return (this._tagState = XMLDocument.tag.DEFAULT);
      }

      default: {
        return this._tagState;
      }
    }
  }

  parse() {
    const nodes = [];
    const stack = [];

    const splitted = XMLDocument.splitByTags(this.xmlString);

    let root = null;
    let tagState = this._tagState;

    splitted.forEach((currentItem) => {
      const currentTag = stack[0];

      if (XMLDocument.types.META_TAG(currentItem)) {
        return (tagState = this.nextTagState(XMLDocument.regexps.META_TAG));
      }

      if (XMLDocument.types.L_ANGLE(currentItem)) {
        return (tagState = this.nextTagState(XMLDocument.regexps.L_ANGLE));
      }

      if (XMLDocument.types.CLOSE_TAG(currentItem)) {
        return (tagState = this.nextTagState(XMLDocument.regexps.CLOSE_TAG));
      }

      if (XMLDocument.types.CLOSE_SINGLE_TAG(currentItem)) {
        currentTag.isSingle();

        if (tagState === XMLDocument.tag.OPENING) {
          stack.shift();
        }

        return (tagState = this.nextTagState(
          XMLDocument.regexps.CLOSE_SINGLE_TAG
        ));
      }

      if (XMLDocument.types.R_ANGLE(currentItem)) {
        if (tagState === XMLDocument.tag.CLOSING) {
          stack.shift();
        }

        return (tagState = this.nextTagState(XMLDocument.regexps.R_ANGLE));
      }

      if (XMLDocument.types.CONTENT) {
        if (tagState === XMLDocument.tag.OPENING) {
          const tagData = currentItem;

          const [name, props] = XMLDocument.parseTag(tagData);

          const tag = new Tag(name, props);

          if (currentTag instanceof Tag) {
            currentTag.addChild(tag);
          } else {
            root = tag;
          }

          nodes.push(tag);
          stack.unshift(tag);
        }

        if (tagState === XMLDocument.tag.DEFAULT) {
          const text = new Text(currentItem);

          if (currentTag instanceof Tag) {
            currentTag.addChild(text);
          }

          nodes.push(text);
        }

        return (tagState = this.nextTagState(XMLDocument.regexps.CONTENT));
      }
    });

    this.tree = { root, nodes };
    this.root = root;

    return this.tree;
  }

  static tagToString(tag, index = 0) {
    const tabs = "\t".repeat(index);

    let xml = tabs;

    if (tag instanceof Text) {
      xml += tag.getText();
    } else if (tag instanceof Tag) {
      xml += `<${tag.getName()}`;

      const props = [...tag.getProps().entries()];

      props.forEach(([name, value]) => {
        xml += ` ${name}="${value}"`;
      });

      if (tag.getSingle()) {
        xml += "/>";
      } else {
        xml += ">\n";

        tag.getChildren().forEach((child) => {
          xml += XMLDocument.tagToString(child, index + 1);
        });

        xml += tabs;

        xml += `</${tag.getName()}>`;
      }
    } else {
      throw new Error("Undefined token");
    }

    xml += "\n";

    return xml;
  }

  copy(): XMLDocument {
    const document = new XMLDocument(this.xmlString);
    document.parse();

    return document;
  }

  toString() {
    XMLDocument.handleError(this);

    const { root } = this.tree;

    return XMLDocument.tagToString(root);
  }

  [Symbol.toPrimitive]() {
    return this.toString();
  }

  static tag = {
    OPENING: "OPENING",
    CLOSING: "CLOSING",
    DEFAULT: "DEFAULT",
    META: "META",
  };

  static regexps = {
    META_TAG: /(<\?)|(\?>)/,
    L_ANGLE: /^<$/,
    R_ANGLE: /^>$/,
    CLOSE_TAG: /^<\/$/,
    CLOSE_SINGLE_TAG: /^\/>$/,
    ESCAPE: /^\/$/,
    CONTENT: /^\S+$/,
    WHITE_SPACE: /^\s$/,
    SEPARATOR: /(<(?:\/|\?)?|(?:\/|\?)?>)/,
  };

  static types = createExecutor(XMLDocument.regexps);
}
