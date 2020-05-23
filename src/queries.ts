import { XPath, XQuery, XMLDocument } from "utils/XMLUtils";

export const queries = (xml: XMLDocument) => {
  const results = [];

  const queryString1 =
    "products/product[price  > 1000]/name[contains(@description, 'В наличии')]";

  const query1 = new XPath(queryString1);
  query1.parse();

  results[1] = query1.execute(xml);

  const queryString2 =
    "products/product[@index='1']/name[contains(@description, 'В наличии')]";

  const query2 = new XPath(queryString2);
  query2.parse();

  results[2] = query2.execute(xml);

  const query3 = new XQuery("1 + 2 * (3 - (4 * ((5 - 6) + 7 div 8))) + 9");
  query3.parse();

  results[3] = query3.calc();

  const query4 = new XQuery("count(products/product/comments/comment)");
  query4.parse();

  results[4] = query4.calc(xml);

  const query5 = new XQuery(
    "count(products/node()[contains(name(), '_')]/preceding-sibling::*) + 1"
  );
  query5.parse();

  results[5] = query5.calc(xml);

  const queryString6 = "products/product[0]/comments/comment[0]/node()/text()";

  const query6 = new XPath(queryString6);
  query6.parse();

  results[6] = query6.execute(xml);

  const queryString7 =
    "products/product[price > 10000 and price < 80000 and contains(name, 'Bitmain')]";

  const query7 = new XPath(queryString7);
  query7.parse();

  results[7] = query7.execute(xml);

  const queryString8 =
    "products/product/node()[(name() = 'price') or (name() = 'id')]";

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
