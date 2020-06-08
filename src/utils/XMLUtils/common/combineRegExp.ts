export const combineRegExp = (regexps: RegExp[], save: boolean = false, wrap: boolean = true) => {
  const combined = regexps.map((regexp) => {

    if(/^[a-zA-Z]+$/.test(regexp.source) && wrap) {
      return ` ${regexp.source} `
    }

    return regexp.source
  
  }).join("|");

  return new RegExp(save ? `(${combined})` : combined);
};
