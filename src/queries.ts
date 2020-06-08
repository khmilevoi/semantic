import { XPath, XQuery, XMLDocument } from "./utils/XMLUtils";

export const queries = (xml: XMLDocument) => {
  const results = {};

  const queryString1 =
    "products/product[price > 50]/name[contains(@brand, 'YINHE')]";

  const query1 = new XPath(queryString1);
  query1.parse();

  results[1] = query1.execute(xml);

  const queryString2 =
    "products/product[@index='1']/name";

  const query2 = new XPath(queryString2);
  query2.parse();

  results[2] = query2.execute(xml);

  const queryString3 = "products/product/name/text()";

  const query3 = new XPath(queryString3);
  query3.parse();

  results[3] = query3.execute(xml);

  const queryString3_1 = "products/product[0]/name/text()";

  const query3_1 = new XPath(queryString3_1);
  query3_1.parse();

  results["3_1"] = query3_1.execute(xml);

  const query4 = new XQuery("count(products/product/comments/comment)");
  query4.parse();

  results[4] = query4.calc(xml);

  const query4_2 = new XQuery("count(products/product)");
  query4_2.parse();

  results["4_2"] = query4_2.calc(xml);

  const query5 = new XQuery(
    "count(products/node()[contains(name(), '_')]/preceding-sibling::*) + 1"
  );
  query5.parse();

  results[5] = query5.calc(xml);

  const queryString6 =
    "products/product[0]/comments/comment[0]/node()[0]/text()";

  const query6 = new XPath(queryString6);
  query6.parse();

  results[6] = query6.execute(xml);

  const queryString6_1 =
    "products/product[0]/comments/comment[0]/node()[1]/text()";

  const query6_1 = new XPath(queryString6_1);
  query6_1.parse();

  results["6_1"] = query6_1.execute(xml);

  const queryString7 =
    "products/product[(price > 50) and (price < 120) and contains(name, 'мячи')]";

  const query7 = new XPath(queryString7);
  query7.parse();

  results[7] = query7.execute(xml);

  const queryString8 =
    "products/product[position() mod 5 = 0]/node()[(name() = 'price') or (name() = 'id')]";

  const query8 = new XPath(queryString8);
  query8.parse();

  results[8] = query8.execute(xml);

  const queryString9 =
    "products/product[position() mod 2 = 0]/comments/comment[position() mod 2 = 0]/concat(@index, ' ', name, ': ', content)";

  const query9 = new XPath(queryString9);
  query9.parse();

  results[9] = query9.execute(xml);
  return results;
};
