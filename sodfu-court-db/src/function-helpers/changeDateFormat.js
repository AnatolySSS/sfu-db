import changeDateType from "./changeDateType";
import formatDate from "./formatDate";

//Изменение формата даты со строки на объект Date (необходимо для правильной фильтрации)
export const changeDateFormat = (docs) => {
  docs = docs.map((obj) => {
    for (const key in obj) {
      if (key.includes("Date")) {
        obj[key] = formatDate(new Date(obj[key]));
        obj[key] = changeDateType(obj[key]);
        obj[key] = Date.parse(obj[key]);
        obj[key] = new Date(obj[key]);
      }
    }
    return obj;
  });
  return docs;
};
