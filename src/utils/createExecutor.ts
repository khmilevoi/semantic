type TExecutable = {
  [name: string]: RegExp | CallableFunction;
};

export type Types = {
  [name: string]: (string) => boolean;
};

export const createExecutor = (executable: TExecutable): Types => {
  return Object.entries(executable).reduce((types, [key, value]) => {
    const result = { ...types };

    if (value instanceof RegExp) {
      result[key] = (str) => value.test(str);
    }

    return result;
  }, {});
};
