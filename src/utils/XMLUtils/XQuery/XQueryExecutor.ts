import { Executor } from "../common/Executor";

import { XMLDocument, Tag } from "../XMLDocument";
import { TTree } from "./XQueryParser";

export class XQueryExecutor extends Executor<Tag[], TTree> {
  executeExpression(source: Tag[], tree: TTree): Tag[] {
    const expressions = tree.expressions.sort((left, right) => {
      const leftOperator = left.getOperator();
      const rightOperator = right.getOperator();

      const leftOrder = leftOperator ? leftOperator.getOrder() : Infinity;
      const rightOrder = rightOperator ? rightOperator.getOrder() : Infinity;

      return leftOrder - rightOrder;
    });

    return source.filter((tag, index) => {
      expressions.forEach((item) =>
        item.execute(tag, { rewrite: true, args: [index] })
      );

      const result = tree.root.execute(tag, { args: [index] });

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
}
