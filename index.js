import https from "https";
import fs from "fs";
import { JSDOM } from "jsdom";

const readURL = (url) =>
  new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];

      res.on("error", (error) => reject(error));

      res.on("data", (data) => chunks.push(data));

      res.on("end", () => resolve(Buffer.concat(chunks)));
    });
  });

const saveFile = (file, inner) =>
  new Promise((resolve, reject) => {
    fs.writeFile(`${file}`, inner, (error) => {
      if (error) {
        reject(error);
      }

      resolve({ file, inner });
    });
  });

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

const parseInformation = (html) => {
  const {
    window: { document },
  } = html;

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

const createChildren = (item) =>
  Object.entries(item).reduce(
    ([attributes, children], [name, value]) => {
      let tag = "";

      switch (name) {
        case "id": {
          attributes += ` id="${value}"`;
        }

        default: {
          tag += `<${name}>`;
          tag += value;
          tag += `</${name}>`;
        }
      }

      children += tag;

      return [attributes, children];
    },
    ["", ""]
  );

const createXML = (items = [], itemName) => {
  return items.reduce((xml, item, index) => {
    xml += `<${itemName}`;

    xml += ` index="${index}"`;

    let [attributes, children] = createChildren(item);

    xml += attributes;
    xml += ">";

    xml += children;

    xml += `</${itemName}>`;

    return xml;
  }, "");
};

const wrapXML = (xml) => {
  let wrappedXML = '<?xml version="1.0"?>';

  wrappedXML += '<root xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
  wrappedXML += xml;
  wrappedXML += "</root>";

  return wrappedXML;
};

const main = async () => {
  try {
    const data = await readURL("https://tt-maximum.com/shop/balls");
    const html = data.toString();

    const parsedHTML = new JSDOM(html);

    const items = parseInformation(parsedHTML);

    const xml = wrapXML(createXML(items, "product"));

    await saveFile("./result.xml", xml);
  } catch (error) {
    console.log(error);
  }
};

main();
