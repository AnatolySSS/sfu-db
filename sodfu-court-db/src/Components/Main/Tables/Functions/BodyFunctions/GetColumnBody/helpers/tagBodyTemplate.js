import { Tag } from "primereact/tag";
import { Dropdown } from 'primereact/dropdown';
import { getSeverity } from "../../../getSeverity";

export const tagBodyTemplate = (field) => {
    return (rowData) => {
      return (
        <div className="text-center">
          {rowData[field] && <Tag
            value={rowData[field]}
            severity={getSeverity(rowData[field], field)}
          />}
        </div>
      );
    };
  };

  export const docNegativesBodyTemplate = (field) => {
    return (rowData) => {
      return (
        <div className="card flex justify-content-center">
          {rowData[field].length != 0 ? <Dropdown
            placeholder="Негатив"
            options={rowData[field]}
            className="w-full"
          /> : null}
        </div>
      );
    };
  };