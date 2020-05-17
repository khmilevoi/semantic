export const combineRegExp = (regexps: RegExp[], save: boolean = false) => {
  const combined = regexps.map((regexp) => regexp.source).join("|");

  return new RegExp(save ? `(${combined})` : combined);
};
