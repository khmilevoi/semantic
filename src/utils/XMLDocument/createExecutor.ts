type TExecutable = {
  [name: string]: RegExp;
};

export type Types = {
  [name: string]: (string) => boolean;
};

export const createExecutor = (executable: TExecutable): Types => {
  return Object.entries(executable).reduce((types, [key, value]) => {
    return {
      ...types,
      [key]: (str) => value.test(str),
    };
  }, {});
};
