import { parseInformation } from "utils/parseHTML";
import { createXML, wrapXML } from "utils/createXML";

import { readURL } from "utils/readURL";
import { saveFile } from "utils/saveFile";
import { readFile } from "utils/readFile";

import { XMLDocument, XSLExecutor, XPath, XQuery } from "utils/XMLUtils";

import { modifyTree } from "modifyTree";

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

    const composedDocument = new XSLExecutor(modifiedXmlDocument, xslDocument);
    const htmlDocument = composedDocument.compose();

    await saveFile("src/results/document.html", htmlDocument.toString());

    const xpathString =
      "products/product[(price + 5)+(2 * position() - @index div 2)]/name[position() mod 2 = 0]";

    const xpath = new XPath(xpathString);
    xpath.parse();

    const result = xpath.execute(modifiedXmlDocument);

    // const xquery = new XQuery("1 + 2 * ((3 - (4 * ((5 - 6) + 7 div 8))) + 9.5)");
    // xquery.parse();

    // const result = xquery.execute(modifiedXmlDocument.getRoot().getChildren());

    debugger;
  } catch (error) {
    console.log(error);
  }
};

main();
