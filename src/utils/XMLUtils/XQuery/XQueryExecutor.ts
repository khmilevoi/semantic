import { Executor } from "../common/Executor";

import { XMLDocument, Tag } from "../XMLDocument";
import { TTree } from "./XQueryParser";
import { Expression } from "./Expression";

export class XQueryExecutor extends Executor<Tag[], TTree> {
  sortExpressions(expressions: Expression[]) {
    return expressions.sort((left, right) => {
      const leftOrder = left.calcPriority(expressions.length);
      const rightOrder = right.calcPriority(expressions.length);

      return leftOrder - rightOrder;
    });
  }

  calcExpression(
    expressions: Expression[],
    tree: TTree,
    tag?: Tag,
    index?: number,
  ) {
    expressions.forEach((item) =>
      item.execute(tag, { rewrite: true, args: [index] })
    );

    const result = tree.root.execute(tag, { args: [index] });

    return result;
  }

  executeExpression(source: Tag[], tree: TTree): Tag[] {
    const expressions = this.sortExpressions(tree.expressions);

    return source.filter((tag, index) => {
      const result = this.calcExpression(expressions, tree, tag, index);

      if (typeof result === "number") {
        return index === result;
      }

      return !!result;
    });
  }

  execute(source: Tag[], tree: TTree): XMLDocument {
    const root = new Tag("root");
    const result = new XMLDocument();
    result.parse();

    result.setRoot(root);

    const executed = this.executeExpression(source, tree);

    root.addChild(...executed);

    return result;
  }

  calc(tree: TTree, tag?: Tag) {
    const expressions = this.sortExpressions(tree.expressions);

    return this.calcExpression(expressions, tree, tag);
  }
}
