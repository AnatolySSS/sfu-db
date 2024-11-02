import { formatDate } from "../../../../../../../function-helpers/formatDate";

export const dateBodyTemplate = (dateType) => {
    return (rowData) => {
      return <div className="">{formatDate(rowData[dateType], dateType)}</div>
    };
  };