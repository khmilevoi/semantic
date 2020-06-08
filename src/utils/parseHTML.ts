import { JSDOM } from "jsdom";

const parseProp = (name, value) => {
  switch (name) {
    case "sku": {
      return ["id", value.replace(/\s/g, "")];
    }
    default: {
      return [name, value];
    }
  }
};

const parseMeta = (meta) => {
  const name = meta.getAttribute("itemprop");
  const value = meta.getAttribute("content");

  return parseProp(name, value);
};

export const parseInformation = (html: string) => {
  const parsedHTML = new JSDOM(html);

  const {
    window: { document },
  } = parsedHTML;

  const items = document.getElementsByClassName("obj-box");

  return Array.from(Array(items.length), (_, index) => {
    const item = items.item(index);

    const [name] = item.getElementsByClassName("product-name");
    const [brand] = item.getElementsByClassName("brand-caption");
    const [description] = item.getElementsByClassName("obj-box-desc");
    const [price] = item.getElementsByClassName("price");

    return {
      id: index + 5000,
      name: name.innerHTML,
      brand: brand.innerHTML,
      description: description.innerHTML,
      price: price.innerHTML,
    };
  });
};
