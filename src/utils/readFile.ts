import * as fs from "fs";

export const readFile = async (path: string) =>
  new Promise<Buffer>((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      }

      const file = data;

      resolve(file);
    });
  });
