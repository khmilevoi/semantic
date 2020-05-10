import * as https from "https";

export const readURL = (url: string) =>
  new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];

      res.on("error", (error) => reject(error));

      res.on("data", (data) => chunks.push(data));

      res.on("end", () => resolve(Buffer.concat(chunks)));
    });
  });
