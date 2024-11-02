import { formatDate } from "../../../../function-helpers/formatDate";
import changeDateType from "../../../../function-helpers/changeDateType";

export const changeDateCourtDocsObj = (arr) => {
    return arr.map((obj) => {
      let newObj = {};
      for (const key in obj) {
        // if (typeof obj[key] === 'number') {
          if (key.includes("Date")) {
          newObj[key] = ExcelDateToJSDate(obj[key]);
          newObj[key] = formatDate(newObj[key]);
          newObj[key] = changeDateType(newObj[key]);
        } else {
          newObj[key] = obj[key];
        }
      }
      return newObj;
    })
  };
  
  const ExcelDateToJSDate = (serial) => {
    let utc_days  = Math.floor(serial - 25569);
    let utc_value = utc_days * 86400;                                        
    let date_info = new Date(utc_value * 1000);
    let fractional_day = serial - Math.floor(serial) + 0.0000001;
    let total_seconds = Math.floor(86400 * fractional_day);
    let seconds = total_seconds % 60;
    total_seconds -= seconds;
    let hours = Math.floor(total_seconds / (60 * 60));
    let minutes = Math.floor(total_seconds / 60) % 60;
  
    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
  }