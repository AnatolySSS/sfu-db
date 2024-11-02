import changeDateType from "../../../../function-helpers/changeDateType";
import { formatDate } from "../../../../function-helpers/formatDate";

//Изменение формата даты со строки на объект Date (необходимо для правильной фильтрации)
export const changeDateFormat = (filters) => {
  for (const filter in filters) {
    if (filter.includes("Date")) {
      
      filters[filter].constraints.forEach(constraint => {
        if (constraint.value != null) {
          constraint.value = formatDate(constraint.value);
          constraint.value = changeDateType(constraint.value);
        }
      });
    }
  }
  return filters;
};
