import { classNames } from "primereact/utils";
import { RiErrorWarningLine, RiErrorWarningFill } from "react-icons/ri";

export const checkboxBodyTemplate = (checkboxType) => {
  return (rowData) => {
    return (
      <div className="text-center">
        <i
          className={classNames(
            "pi",
            rowData[checkboxType]
              ? "text-green-500 pi-check-circle"
              : "text-red-500 pi-times-circle"
          )}
        ></i>
      </div>
    );
  };
};

export const checkboxNegativeBodyTemplate = (checkboxType) => {
  return (rowData) => {
    return (
      <div className="text-center">
        <i
          className={classNames(
            "pi",
            rowData[checkboxType]
              ? "text-red-500 pi-exclamation-circle"
              : "text-green-500 pi-minus-circle"
          )}
        ></i>
      </div>
    );
  };
};