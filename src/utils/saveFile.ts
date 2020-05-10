import * as fs from "fs";

export const saveFile = (file: string, inner: string) =>
  new Promise((resolve, reject) => {
    fs.writeFile(`${file}`, inner, (error) => {
      if (error) {
        reject(error);
      }

      resolve({ file, inner });
    });
  });
