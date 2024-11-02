import { useState, useEffect } from "react";
import CourtsListTableHeader from "./TableHeader/CourtsListTableHeader";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { classNames } from "primereact/utils";
import { getTableHeight } from "../../../../function-helpers/getTableHeight";
import styles from "./CourtsListTable.module.css";
import { getGlobalFilters} from "../Functions/FiltersFunction/GlobalFilterFunctions/globalFilterFunctions";
import { getColumnFilterElement } from "../Functions/FiltersFunction/GetColumnFilterElement/getColumnFilterElement";
import { getColumnBody } from "../Functions/BodyFunctions/GetColumnBody/getColumnBody";
import CourtsListDialogContainer from "./Dialogs/CourtsListDialogContainer";
import { changeDateFormat } from "../Functions/changeDateFormat";
import { dateBodyTemplate } from "../Functions/BodyFunctions/GetColumnBody/helpers/dateBodyTemplate";

const CourtsListTable = (props) => {

  const {
    courts,
    columns,
    filters: sourceFilters,
    requestData,
    updateData,
    employer,
    saveVisibleColumns,
    theme,
    values,
    isFetching,
    totalRecords,
  } = props;

  const [filters, setFilters] = useState(sourceFilters);
  const [selectedTask, setSelectedTask] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState(props.visibleColumns);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [expandedRows, setExpandedRows] = useState(null);
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 1,
    sortField: null,
    sortOrder: null,
    filters: sourceFilters,
  });

  useEffect(() => {
    lazyState.filters = changeDateFormat(lazyState.filters);
    requestData(lazyState, employer);
  }, [lazyState]);

  useEffect(() => {
    let _lazyState = {...lazyState}
    _lazyState.filters = filters;
    setlazyState(_lazyState)
  }, [filters]);

  useEffect(() => {
    getTableHeight();
  }, [isFetching]);

  window.onresize = () => {
    getTableHeight();
  };

  const onPage = (event) => {
    setlazyState(event);
  };

  const onSort = (event) => {
    setlazyState(event);
  };

  const onFilter = (event) => {
    let _event = { ...event };
    _event["first"] = 0;
    setlazyState(_event);
  };

  const onRowClick = (event) => {
    setSelectedTask(event.data);
    setVisibleDialog(true);
  };

  const allowExpansion = (rowData) => {
    return rowData.logs.length > 0;
  };

  const rowExpansionTemplate = (data) => {
    // let obj = data.logs.map((type) => {
    //   return { type };
    // });
    return (
      <div className="p-2">
        <DataTable
          value={data.logs}
          style={{ width: "75vw" }}
          scrollable
          scrollHeight="15vw"
        >
          <Column
            field="changedFiled"
            header="Измененное значение"
            headerStyle={{
              fontWeight: "bold",
              backgroundColor: theme === "dark" ? "#161616" : "#f5f5f5",
            }}
            style={{ minWidth: "10rem", textWrap: "wrap", fontSize: 14 }}
          ></Column>
          <Column
            field="changedDateTime"
            header="Дата изменения"
            headerStyle={{
              fontWeight: "bold",
              backgroundColor: theme === "dark" ? "#161616" : "#f5f5f5",
            }}
            style={{ minWidth: "10rem", textWrap: "wrap", fontSize: 14 }}
            body={dateBodyTemplate("changedDateTime")}
          ></Column>
          <Column
            field="changedEmployeeName"
            header="ФИО Сотрудника"
            headerStyle={{
              fontWeight: "bold",
              backgroundColor: theme === "dark" ? "#161616" : "#f5f5f5",
            }}
            style={{ minWidth: "10rem", textWrap: "wrap", fontSize: 14 }}
          ></Column>
          <Column
            field="newValue"
            header="Новое значение"
            headerStyle={{
              fontWeight: "bold",
              backgroundColor: theme === "dark" ? "#161616" : "#f5f5f5",
            }}
            style={{ minWidth: "10rem", textWrap: "wrap", fontSize: 14 }}
          ></Column>
          <Column
            field="oldValue"
            header="Старое значение"
            headerStyle={{
              fontWeight: "bold",
              backgroundColor: theme === "dark" ? "#161616" : "#f5f5f5",
            }}
            style={{ minWidth: "10rem", textWrap: "wrap", fontSize: 14 }}
          ></Column>
        </DataTable>
      </div>
    );
  };

  const header = (
    <CourtsListTableHeader
      columns={columns}
      sourceFilters={sourceFilters}
      filters={lazyState.filters}
      saveVisibleColumns={saveVisibleColumns}
      setFilters={setFilters}
      visibleColumns={visibleColumns}
      setVisibleColumns={setVisibleColumns}
    />
  );

  return (
    <div
      className={classNames(
        "card",
        styles.cardStyle,
        theme === "dark" ? styles.cardStyleDark : styles.cardStyleLight
      )}
    >
      {/* <Toast ref={toastRowSelect} position="bottom-left" /> */}
      {selectedTask && (
        <CourtsListDialogContainer
          employer={employer}
          isFetching={isFetching}
          visibleDialog={visibleDialog}
          setVisibleDialog={setVisibleDialog}
          selectedTask={selectedTask}
          updateData={updateData}
          lazyState={lazyState}
        />
      )}
      <DataTable
        dataKey="id"
        className={styles.table}
        value={courts}
        size="normal"
        filterDisplay="menu"
        globalFilterFields={getGlobalFilters(sourceFilters)}
        header={header}
        emptyMessage="No customers found."
        removableSort
        reorderableColumns
        resizableColumns
        columnResizeMode="expand"
        // showGridlines
        paginator
        rows={lazyState.rows}
        scrollable
        scrollHeight="auto"
        rowsPerPageOptions={[5, 10, 25, 50, 100, 150, 200, 250]}
        tableStyle={{ minWidth: "50rem" }}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="{first} / {last} из {totalRecords}"
        // selection={selectedTasks}
        selectionMode="single"
        // onSelectionChange={(e) => {setSelectedTasks(e.value)}}
        onRowClick={onRowClick}
        // onContextMenu={makeTask}
        loading={isFetching}
        lazy
        first={lazyState.first}
        totalRecords={totalRecords}
        onPage={onPage}
        onSort={onSort}
        onFilter={onFilter}
        sortField={lazyState.sortField}
        sortOrder={lazyState.sortOrder}
        filters={lazyState.filters}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
      >
        <Column
          expander={allowExpansion}
          style={{ width: "5rem" }}
          headerStyle={{
            fontWeight: "bold",
            backgroundColor: theme === "dark" ? "#161616" : "#f5f5f5",
          }}
        />
        {visibleColumns.map((col, i) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            dataType={col.dataType}
            headerStyle={{
              fontWeight: "bold",
              backgroundColor: theme === "dark" ? "#161616" : "#f5f5f5",
            }}
            sortable
            filter
            filterElement={getColumnFilterElement(col, values)}
            showFilterMatchModes={col.showFilterMenu}
            style={{ minWidth: "12rem", textWrap: "wrap", fontSize: 15 }}
            body={getColumnBody(col)}
            // frozen={col.field == "sodfuNumber" || col.field == "incomingNumber"}
            // alignFrozen={col.field == "sodfuNumber" && "right"}
          ></Column>
        ))}
      </DataTable>
      {/* <ContextMenu global model={items} ref={cm} breakpoint="767px" /> */}
    </div>
  );
};

export default CourtsListTable;
