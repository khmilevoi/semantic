import { Executor } from "../common/Executor";

import { XMLDocument, Tag } from "../XMLDocument";
import { TTree } from "./XQueryParser";
import { Expression } from "./Expression";

export class XQueryExecutor extends Executor<Tag[], TTree> {
  sortExpressions(expressions: Expression[]) {
    return expressions.sort((left, right) => {
      const leftOrder = left.calcPriority(expressions.length);
      const rightOrder = right.calcPriority(expressions.length);

      console.log(
        "left: ",
        leftOrder,
        left.getDeep(),
        left.getOperator() && left.getOperator().getOrder()
      );
      console.log(
        "right: ",
        rightOrder,
        right.getDeep(),
        right.getOperator() && right.getOperator().getOrder()
      );

      return leftOrder - rightOrder;
    });
  }

  calcExpression(
    expressions: Expression[],
    tree: TTree,
    index?: number,
    tag?: Tag
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
      const result = this.calcExpression(expressions, tree, index, tag);

      debugger;

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

  calc(tree: TTree) {
    const expressions = this.sortExpressions(tree.expressions);

    debugger;

    return this.calcExpression(expressions, tree);
  }
}
