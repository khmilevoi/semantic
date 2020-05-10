import { readURL } from "utils/readURL";
import { parseInformation } from "utils/parseHTML";
import { createXML, wrapXML } from "utils/createXML";
import { saveFile } from "utils/saveFile";

const main = async () => {
  try {
    const data = await readURL("https://smt.ua/asic_miner/");
    const html = data.toString();

    const items = parseInformation(html);

    const xml = wrapXML(createXML(items, "product"));

    await saveFile("./src/result.xml", xml);
  } catch (error) {
    console.log(error);
  }
};

main();
