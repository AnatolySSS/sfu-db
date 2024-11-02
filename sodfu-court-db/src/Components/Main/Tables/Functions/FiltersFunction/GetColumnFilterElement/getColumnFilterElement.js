import { docNegativesFilterTemplate, dropdownFilterTemplate } from "./helpers/dropdownFilterTemplate";
import { checkboxFilterTemplate } from "./helpers/checkboxFilterTemplate";
import { dateFilterTemplate } from "./helpers/dateFilterTemplate";

export const getColumnFilterElement = (col, values) => {
  switch (col.editingType) {
    case "dropdown":
      switch (col.field) {
        case "docNegatives":
          return docNegativesFilterTemplate(values[col.field])
        default:
          return dropdownFilterTemplate(values[col.field])
      }
    case "checkbox":
      return checkboxFilterTemplate(col.field);
    case "date":
      return dateFilterTemplate;
    default:
      return null;
  }
};