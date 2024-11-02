export const changeBooleanFormat = (docs) => {
  docs = docs.map((obj) => {
    for (const key in obj) {
      if (key == "hasRequest" || key == "isAnalized") {
        switch (obj[key]) {
          case 1:
            obj[key] = true;
            break;
          case 0:
            obj[key] = false;
            break;
          default:
            break;
        }
      }
    }
    return obj;
  });
  return docs;
};
