import * as fs from "fs";
import * as path from "path";

export const readFile = async (pathTo: string) =>
  new Promise<Buffer>((resolve, reject) => {
    fs.readFile(path.join(__dirname, pathTo), (err, data) => {
      if (err) {
        reject(err);
      }

      const file = data;

      resolve(file);
    });
  });
