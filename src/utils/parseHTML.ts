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

  const items = document.getElementsByClassName("product-thumb");

  return Array.from(Array(items.length), (_, index) => {
    const item = items.item(index);

    const product = {};

    const metaInfo = item.querySelectorAll("meta");

    for (let meta of metaInfo) {
      const [name, value] = parseMeta(meta);

      product[name] = value;
    }

    return product;
  });
};
