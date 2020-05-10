import { parseInformation } from "utils/parseHTML";
import { createXML, wrapXML } from "utils/createXML";
import { XMLDocument } from "utils/XMLDocument";

import { readURL } from "utils/readURL";
import { saveFile } from "utils/saveFile";
import { readFile } from "utils/readFile";

import { modifyTree } from "modifyTree";
import { Composer } from "utils/XMLDocument/Composer";

const main = async () => {
  try {
    const data = await readURL("https://smt.ua/asic_miner/");
    const html = data.toString();

    const items = parseInformation(html);

    const xml = createXML(items, "product");

    const wrappedXml = wrapXML(xml, { root: "products", meta: false });

    const xmlDocument = new XMLDocument(wrappedXml);
    xmlDocument.parse();

    const modifiedXmlDocument = modifyTree(xmlDocument.copy());

    await saveFile(
      "src/results/document.xml",
      wrapXML(xmlDocument.toString(), { withoutRoot: true, meta: true })
    );
    await saveFile(
      "src/results/modifiedDocument.xml",
      wrapXML(modifiedXmlDocument.toString(), { withoutRoot: true, meta: true })
    );

    const xsl = (await readFile("src/resources/result.xsl")).toString();

    const xslDocument = new XMLDocument(xsl);
    xslDocument.parse();

    const composedDocument = new Composer(modifiedXmlDocument, xslDocument);
    const htmlDocument = composedDocument.compose();

    await saveFile("src/results/document.html", htmlDocument.toString());

    debugger;
  } catch (error) {
    console.log(error);
  }
};

main();
