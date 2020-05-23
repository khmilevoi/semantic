import { Executor } from "../common/Executor";
import { Token } from "../common/Token";
import { XMLDocument, Tag, TNode } from "../XMLDocument";

export class XPathExecutor extends Executor<Tag, Token[]> {
  executePath(root: TNode, path: Token[], prev?: TNode[]): TNode[] {
    const [first, ...other] = path;

    const children: TNode = first.execute(root, prev);

    if (!Array.isArray(children)) {
      throw new Error(`Handler return incorrect value [${children}]`);
    }

    if (other.length === 0) {
      return children;
    }

    const tags = children.reduce((result, child) => {
      const currentResult = this.executePath(child, other, children);

      return [...result, ...currentResult];
    }, []);

    return tags;
  }

  execute(source: Tag, path: Token[]): XMLDocument {
    const root = new Tag("root");
    const result = new XMLDocument();
    result.parse();

    result.setRoot(root);

    const executed = this.executePath(source, path);

    root.addChild(...executed);

    return result;
  }
}
