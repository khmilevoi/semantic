import { XMLDocument, Text, Tag } from "utils/XMLDocument";

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

        comment.addChild(
          new Tag("name", {}, [new Text(String.fromCharCode(65 + index))]),
          new Tag("content", {}, [
            new Text(String.fromCharCode(65 + index).repeat(amount * 10)),
          ])
        );

        return comment;
      })
    );

    tag.addChild(comments);
  });

  return document;
};