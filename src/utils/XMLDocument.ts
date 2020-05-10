class Node {
  private id: Symbol;

  constructor(id: string) {
    this.id = Symbol(id.slice(0, 10));
  }

  getId() {
    return this.id;
  }
}

export type TNode = Text | Tag;

export class Text extends Node {
  private text: string;

  constructor(text: string) {
    super(text);

    this.text = text;
  }

  getText() {
    return this.text;
  }

  setText(text) {
    return (this.text = text);
  }
}

type Props = {
  [name: string]: any;
};

export class Tag extends Node {
  private name: string;
  private props: Map<string, any>;
  private children: TNode[];
  private single: boolean;

  constructor(
    name: string = null,
    props: Props = {},
    children = [],
    single = false
  ) {
    super(name);

    this.name = name;
    this.props = new Map(Object.entries(props));
    this.children = children;
    this.single = single;
  }

  find(name): Tag {
    return this.children.reduce<Tag>((found, tag) => {
      if (tag instanceof Tag) {
        if (tag.name === name) {
          return tag;
        }

        return tag.find(name);
      }

      return found;
    }, null);
  }

  findAll(name): Tag[] {
    return this.children.reduce((tags, tag) => {
      if (tag instanceof Tag) {
        if (tag.name === name) {
          return [...tags, tag];
        }

        return [...tags, ...tag.findAll(name)];
      }

      return tags;
    }, []);
  }

  getSingle() {
    return this.single || !this.children.length;
  }

  isSingle() {
    return (this.single = true);
  }

  isNotSingle() {
    return (this.single = false);
  }

  getName() {
    return this.name;
  }

  setName(name: string) {
    return (this.name = name);
  }

  getProps() {
    return this.props;
  }

  getProp(key) {
    return this.props.get(key);
  }

  addProp(key, value) {
    return this.props.set(key, value);
  }

  removeProp(key) {
    return this.props.delete(key);
  }

  getChildren(): TNode[] {
    return this.children;
  }

  addChild(...child: TNode[]) {
    return this.children.push(...child);
  }

  removeChild(child: TNode) {
    const index = this.children.findIndex(
      (item) => item.getId() === child.getId()
    );

    return this.children.splice(index, 1);
  }
}

type Tree = {
  root: TNode;
  nodes: Tag[];
};

type Types = {
  [name: string]: (string) => boolean;
};

export class XMLDocument {
  private xmlString: string;
  private tree: Tree;

  private _tagState: string;

  constructor(xml: string) {
    this.xmlString = xml;
    this.tree = null;

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

      if (XMLDocument.types.L_ANGLE(currentItem)) {
        return (tagState = this.nextTagState(XMLDocument.regexps.L_ANGLE));
      }

      if (XMLDocument.types.CLOSE_TAG(currentItem)) {
        return (tagState = this.nextTagState(XMLDocument.regexps.CLOSE_TAG));
      }

      if (XMLDocument.types.CLOSE_SINGLE_TAG(currentItem)) {
        currentTag.isSingle();

        if (tagState === XMLDocument.tag.OPENING) {
          if (currentTag.children.length === 0) {
            currentTag.isSingle();
          }

          stack.shift();
        }

        return (tagState = this.nextTagState(
          XMLDocument.regexps.CLOSE_SINGLE_TAG
        ));
      }

      if (XMLDocument.types.R_ANGLE(currentItem)) {
        if (tagState === XMLDocument.tag.CLOSING) {
          if (currentTag.children.length === 0) {
            currentTag.isSingle();
          }

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
  };

  static regexps = {
    L_ANGLE: /^<$/,
    R_ANGLE: /^>$/,
    CLOSE_TAG: /^<\/$/,
    CLOSE_SINGLE_TAG: /^\/>$/,
    ESCAPE: /^\/$/,
    CONTENT: /^\S+$/,
    WHITE_SPACE: /^\s$/,
    SEPARATOR: /(<\/?|\/?>)/,
  };

  static types: Types = (() => {
    return Object.entries(XMLDocument.regexps).reduce((types, [key, value]) => {
      return {
        ...types,
        [key]: (str) => value.test(str),
      };
    }, {});
  })();
}
