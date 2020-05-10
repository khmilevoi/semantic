type Item = { [name: string]: string };

const createChildren = (item: Item) =>
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

export const wrapXML = (xml: string) => {
  let wrappedXML = '<?xml version="1.0"?>';

  wrappedXML += '<root xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
  wrappedXML += xml;
  wrappedXML += "</root>";

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
