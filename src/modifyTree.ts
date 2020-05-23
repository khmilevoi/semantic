import { Tag, Text, XMLDocument } from "utils/XMLUtils";

export const modifyTree = (document: XMLDocument) => {
  const productContainer = document.find("products");

  const names = productContainer.findAll("name");

  names.forEach((tag) => {
    const [name] = tag.getChildren();

    if (name instanceof Text) {
      tag.addProp("description", name.getText().replace(/(.*\()|(\).*)/g, ""));

      name.setText(`Name: ${name.getText()}`);
    }
  });

  const products = document.findAll("product");

  const [firstProduct] = products;

  productContainer.removeChild(firstProduct);

  products.forEach((tag) => {
    const id = tag.getProp("id");

    if (id) {
      const idTag = new Tag("id");
      idTag.addChild(new Text(id));

      tag.addChild(idTag);
      tag.removeProp("id");
    }

    const amount = Math.floor(Math.random() * 5);
    const comments = new Tag("comments", { amount });

    comments.addChild(
      ...Array.from(Array(amount), (_, index) => {
        const comment = new Tag("comment", { index });

        const content = Array.from(
          Array(Math.floor(Math.random() * amount + 50)),
          () => String.fromCharCode(Math.floor(Math.random() * 65 + 65))
        ).join("");

        comment.addChild(
          new Tag("name", {}, [new Text(String.fromCharCode(65 + index))]),
          new Tag("content", {}, [new Text(content)])
        );

        return comment;
      })
    );

    tag.addChild(comments);
  });

  const mockTag = new Tag("two_words");

  productContainer.addChild(mockTag);

  return document;
};
