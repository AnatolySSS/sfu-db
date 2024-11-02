import { Op } from "sequelize";
import { FilterMatchModeConverter } from "./FilterMatchModeConverter.js"

export const getFilterObj = (filters) => {

  try {
    let filterObj = {}
    if (filters.global.value != null) {
      filterObj[Op.or] = [];
    }
  
    for (const key in filters) {
      if (key == "global") {
        continue;
      }
      if (filters.global.value != null) {
        filterObj[Op.or].push({[key]: {[Op.substring]: filters.global.value}});
      }
      switch (filters[key].matchMode) {
        case "in":
          switch (key) {
            case "docNegatives":
              filters[key].value != null ? filterObj[key] = { [Op.or]: {[Op.substring]: [...filters[key].value]} } : null;
              break;
          
            default:
              filters[key].value != null ? filterObj[key] = { [Op.or]: [...filters[key].value] } : null;
              break;
          }
          break;
        case "equals":
          filters[key].value != null ? filterObj[key] = filters[key].value : null;
          break;
        default:
          filterObj[key] = { [Op[filters[key].operator]]: [] };
          filters[key].constraints.forEach(constraint => {
            constraint.value != null ?
            filterObj[key][Op[filters[key].operator]].push({
              [Op[FilterMatchModeConverter[constraint.matchMode]]] : constraint.matchMode == "dateIs" ? new Date(constraint.value) : constraint.value
            }) : null
          })
          break;
      }
    }
    return filterObj;
  } catch (error) {
    console.log('___________getFilterObj_________________');
    console.log(error);
  }  
}