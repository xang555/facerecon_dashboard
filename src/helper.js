export const mergeInObjectArray = (data, name, column, subColumn) => {
  let checkMerge = [],
    item = [];
  data.forEach(obj => {
    if (obj[column][subColumn] !== undefined) {
      let priceName = obj[column][subColumn][name];
      const checkInclude = checkMerge.includes(priceName);
      if (!checkInclude) {
        checkMerge.push(obj[column][subColumn][name]);
        item.push(obj[column][subColumn]);
      }
    }
  });
  return item;
}
