import { readURL } from "utils/readURL";
import { parseInformation } from "utils/parseHTML";
import { createXML, wrapXML } from "utils/createXML";
import { saveFile } from "utils/saveFile";
import { XMLDocument } from "utils/XMLDocument";

import { modifyTree } from "modifyTree";

const main = async () => {
  try {
    const data = await readURL("https://smt.ua/asic_miner/");
    const html = data.toString();

    const items = parseInformation(html);

    const xml = createXML(items, "product");

    const wrappedXml = wrapXML(xml, { root: "products", meta: false });

    const document = new XMLDocument(wrappedXml);
    document.parse();

    const modifiedDocument = modifyTree(document.copy());

    await saveFile(
      "src/results/document.xml",
      wrapXML(document.toString(), { withoutRoot: true })
    );
    await saveFile(
      "src/results/modifiedDocument.xml",
      wrapXML(modifiedDocument.toString(), { withoutRoot: true })
    );
  } catch (error) {
    console.log(error);
  }
};

main();
