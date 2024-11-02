import { useEffect, useState } from "react";
import { classNames } from "primereact/utils";
import styles from './MainTableHeader.module.css'
import {
  onGlobalFilterChange,
  clearFilter,
} from "../Functions/FiltersFunction/GlobalFilterFunctions/globalFilterFunctions";
import { onColumnToggle } from "./Functions/visibleColumnFunctions";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";

const MainTableHeader = (props) => {
  const {
    columns,
    sourceFilters,
    lazyfilters,
    saveVisibleColumns,
    setFilters,
    visibleColumns,
    setVisibleColumns,
  } = props;
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  useEffect(() => {
    clearFilter(sourceFilters, setFilters, setGlobalFilterValue)();
  },[])

  return (
    <div className={classNames("flex justify-content-between", styles.main)}>
      <MultiSelect
        value={visibleColumns}
        options={columns}
        optionLabel="header"
        onChange={onColumnToggle(
          columns,
          setVisibleColumns,
          saveVisibleColumns
        )}
        className={styles.multiSelect}
        // className="w-full sm:w-20rem"
        display="chip"
      />
      <div className={styles.rightGroup}>
        <span className={classNames("p-input-icon-left", styles.span)}>
          <i className="pi pi-search" />
          <InputText
            className={styles.input}
            value={globalFilterValue}
            onChange={onGlobalFilterChange(
              lazyfilters,
              setFilters,
              setGlobalFilterValue
            )}
            placeholder="Поиск"
          />
        </span>
        <Button
          className={styles.button}
          type="button"
          icon="pi pi-filter-slash"
          label="Очистить"
          outlined
          onClick={clearFilter(sourceFilters, setFilters, setGlobalFilterValue)}
          style={{ height: 45 }}
        />
      </div>
    </div>
  );
};

export default MainTableHeader;
