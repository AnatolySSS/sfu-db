export const trimCourtDocsObj = (arr) => {
    return arr.map((obj) => {
      for (const key in obj) {
        typeof obj[key] === 'string' ? obj[key] = obj[key].trim() : obj[key] = obj[key];
      }
      return obj;
    })
  };