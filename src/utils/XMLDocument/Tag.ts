import { Node } from "./Node";
import { TNode } from "./XMLDocument";

type Props = {
  [name: string]: any;
};

export class Tag extends Node {
  private name: string;
  private props: Map<string, any>;
  private children: TNode[];
  private single: boolean;

  constructor(name: string, props: Props = {}, children = [], single = false) {
    super(name);

    this.name = name;
    this.props = new Map(Object.entries(props));
    this.children = children;
    this.single = single;
  }

  find(name, propagation = true): Tag {
    if (this.name === name) {
      return this;
    }

    return this.children.reduce<Tag>((found, tag) => {
      if (tag instanceof Tag) {
        if (tag.name === name) {
          return tag;
        }

        if (!propagation) {
          return found;
        }

        if (!found) {
          return tag.find(name);
        }
      }

      return found;
    }, null);
  }

  findAll(name, propagation = true): Tag[] {
    return this.children.reduce((tags, tag) => {
      if (tag instanceof Tag) {
        if (tag.name === name) {
          return [...tags, tag];
        }

        if (!propagation) {
          return tags;
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

  clone() {
    const tag = new Tag(this.name, Object.fromEntries(this.props.entries()));

    return tag;
  }
}
