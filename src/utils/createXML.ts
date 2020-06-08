type Item = { [name: string]: string | number };

const createChildren = (item: Item) =>
  Object.entries(item).reduce(
    ([attributes, children], [name, value]) => {
      let tag = "";

      switch (name) {
        case "id": {
          attributes += ` id="${value}"`;
          break;
        }

        default: {
          tag += `<${name}>`;
          tag += value;
          tag += `</${name}>`;
          break;
        }
      }

      children += tag;

      return [attributes, children];
    },
    ["", ""]
  );

type Params = {
  root?: string;
  meta?: boolean;
  withoutRoot?: boolean;
};

export const wrapXML = (xml: string, params?: Params) => {
  const { root = "root", meta, withoutRoot } = params || {};

  let wrappedXML = xml;

  if (!withoutRoot) {
    wrappedXML = `
    <${root} xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
      ${wrappedXML}
    </${root}>
    `;
  }

  if (meta) {
    wrappedXML = `<?xml version="1.0"?>\n${wrappedXML}`;
  }

  return wrappedXML;
};

export const createXML = (items: Item[] = [], itemName: string) => {
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
