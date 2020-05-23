import { XPath, XQuery, XMLDocument } from "utils/XMLUtils";

export const queries = (xml: XMLDocument) => {
  const results = [];

  const queryString1 =
    "products/product[price  > 1000]/name[contains(@description, 'В наличии')]";

  const query1 = new XPath(queryString1);
  query1.parse();

  results.push(query1.execute(xml));

  const queryString2 =
    "products/product[@index='1']/name[contains(@description, 'В наличии')]";

  const query2 = new XPath(queryString2);
  query2.parse();

  results.push(query2.execute(xml));

  const query3 = new XQuery("1 + 2 * (3 - (4 * ((5 - 6) + 7 div 8))) + 9");
  query3.parse();

  results.push(query3.calc());

  const query4 = new XQuery("count(products/product/comments/comment)");
  query4.parse();

  results.push(query4.calc(xml));

  const query5 = new XQuery(
    "count(products/node()[contains(name(), '_')]/preceding-sibling::*) + 1"
  );
  query5.parse();

  results.push(query5.calc(xml));

  const queryString6 = "products/product[0]/comments/comment[0]";

  const query6 = new XPath(queryString6);
  query6.parse();

  results.push(query6.execute(xml));

  return results;
};
