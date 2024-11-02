export const fillAnalized = (arr) => {
    arr.map((obj) => {
      obj.isAnalized = false;
      obj.hasNegative = false;
      obj.docAvailability = "Загружен";
    });
    return arr;
}