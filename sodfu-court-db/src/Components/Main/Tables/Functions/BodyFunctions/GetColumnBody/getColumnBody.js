import { tagBodyTemplate, docNegativesBodyTemplate } from "./helpers/tagBodyTemplate";
import { checkboxBodyTemplate, checkboxNegativeBodyTemplate } from "./helpers/checkboxBodyTemplate";
import { dateBodyTemplate } from "./helpers/dateBodyTemplate";

export const getColumnBody = (col) => {
    switch (col.editingType) {
      case "checkbox":
        switch (col.field) {
          case "hasRequest":
            return checkboxNegativeBodyTemplate("hasRequest");
          case "hasNegative":
            return checkboxNegativeBodyTemplate("hasNegative");
          case "isAnalized":
            return checkboxBodyTemplate("isAnalized");
          default:
            break;
        }
      break;
      case "date":
        switch (col.field) {
          case "incomingDate":
            return dateBodyTemplate("incomingDate");
          case "taskCreateDateTime":
            return dateBodyTemplate("taskCreateDateTime");
          case "analizedDateTime":
            return dateBodyTemplate("analizedDateTime");
          case "submittedToWorkDateTime":
            return dateBodyTemplate("submittedToWorkDateTime");
          default:
            break;
        }
      break;
      case "input":
        switch (col.field) {
          case "sodfuNumber":
            return (rowData) => <div className="text-center"><b>{rowData.sodfuNumber}</b></div> ;
          case "incomingNumber":
            return (rowData) => <div className="text-center"><b>{rowData.incomingNumber}</b></div> ;
          case "courtSite":
            return (rowData) => <a href={rowData.courtSite} target="_blank"><b>{rowData.courtSite}</b></a> ;
          default:
            break;
        }
      break;
      case "dropdown":
        switch (col.field) {
          case "taskStatus":
            return tagBodyTemplate("taskStatus");
          case "docAvailability":
            return tagBodyTemplate("docAvailability");
          case "docNegatives":
            return docNegativesBodyTemplate("docNegatives");
          default:
            break;
        }
      break;
      default:
        return null;
    }
  };