import { useState, useEffect, useRef } from "react";
import TableHeader from "../TableHeader/MainTableHeader";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ContextMenu } from "primereact/contextmenu";
import { Toast } from 'primereact/toast';
import { classNames } from "primereact/utils";
import { getTableHeight } from "../../../../function-helpers/getTableHeight";
import styles from "./MyTasksTable.module.css";
import { getGlobalFilters} from "../Functions/FiltersFunction/GlobalFilterFunctions/globalFilterFunctions";
import { getColumnFilterElement } from "../Functions/FiltersFunction/GetColumnFilterElement/getColumnFilterElement";
import { getColumnBody } from "../Functions/BodyFunctions/GetColumnBody/getColumnBody";
import { changeDateFormat } from "../Functions/changeDateFormat";

const MyTasksTable = (props) => {
  const {
    data,
    columns,
    filters: sourceFilters,
    values,
    requestData,
    saveVisibleColumns,
    theme,
    isFetching,
    totalRecords,
    getTotalInWorkRecords,
    userAuth,
  } = props;

  const [filters, setFilters] = useState(sourceFilters);
  const [selectedTasks, setSelectedTasks] = useState(null);
  const [checkBoxRow, setCheckBoxRow] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(props.visibleColumns);
  // const [expandedRows, setExpandedRows] = useState(null);
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 1,
    sortField: null,
    sortOrder: null,
    filters: props.filters,
});
const cm = useRef(null);
const toastRowSelect = useRef(null);

const items = [
  // {
  //   label: "Выполнить",
  //   icon: "pi pi-pencil",
  //   command: () => {
  //     console.log(selectedTasks);
  //   },
  // },
  {
    label: "Настройки",
    icon: "pi pi-wrench",
    items: [
      {
        label: `${checkBoxRow ? "Выключить" : "Включить"} выделение строк`,
        icon: "pi pi-table",
        command: () => {
          setCheckBoxRow(!checkBoxRow);
        },
      },
    ],
  },
];

useEffect(() => {
  lazyState.filters = changeDateFormat(lazyState.filters)
  requestData(lazyState, userAuth.fullName)
}, [lazyState]);

useEffect(() => {
  let _lazyState = {...lazyState}
  _lazyState.filters = filters;
  setlazyState(_lazyState)
}, [filters]);

useEffect(() => {
  getTableHeight()
  userAuth.fullName && getTotalInWorkRecords(userAuth.fullName)
}, [isFetching]);

  window.onresize = () => {
    getTableHeight()
  }

  const onPage = (event) => {
    setlazyState(event);
};

const onSort = (event) => {
    setlazyState(event);
};

const onFilter = (event) => {
    event['first'] = 0;
    setlazyState(event);
};

const rowClass = (data) => {
  return {
      'bg-red-300': data.sodfuNumber === ""
  };
};

// const allowExpansion = (rowData) => {
//   return rowData.docNegatives.length > 0;
// };

// const rowExpansionTemplate = (data) => {
//   let obj = data.docNegatives.map((type) => {
//     return { type };
//   });
//   return (
//     <div className="p-2">
//       <DataTable value={obj} style={{ width: "60vw" }}>
//         <Column
//           field="type"
//           header="Тип негатива"
//           headerStyle={{
//             fontWeight: "bold",
//             backgroundColor: theme === "dark" ? "#161616" : "#f5f5f5",
//           }}
//         ></Column>
//       </DataTable>
//     </div>
//   );
// };

  const header = (
    <TableHeader
      columns={columns}
      sourceFilters={sourceFilters}
      lazyfilters={lazyState.filters}
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
      <Toast ref={toastRowSelect} position="bottom-left" />
      <DataTable
        dataKey="id"
        className={styles.table}
        value={data}
        size="normal"
        filterDisplay="menu"
        globalFilterFields={getGlobalFilters(props.filters)}
        header={header}
        rowClassName={rowClass}
        emptyMessage="No customers found."
        removableSort
        reorderableColumns
        resizableColumns
        columnResizeMode="expand"
        paginator
        rows={lazyState.rows}
        scrollable
        scrollHeight="auto"
        rowsPerPageOptions={[5, 10, 25, 50, 100, 150, 200, 250]}
        tableStyle={{ minWidth: "50rem" }}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="{first} / {last} из {totalRecords}"
        selection={selectedTasks}
        onSelectionChange={(e) => { setSelectedTasks(e.value) }}
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
        // expandedRows={expandedRows}
        // onRowToggle={(e) => setExpandedRows(e.data)}
        // rowExpansionTemplate={rowExpansionTemplate}
      >
        {checkBoxRow && <Column
          selectionMode="multiple"
          frozen
          headerStyle={{
            width: "3rem",
            backgroundColor: theme === "dark" ? "#161616" : "#f5f5f5",
          }}
        ></Column>}
        {/* <Column
          expander={allowExpansion}
          style={{ width: "5rem" }}
          headerStyle={{
            fontWeight: "bold",
            backgroundColor: theme === "dark" ? "#161616" : "#f5f5f5",
          }}
        /> */}
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
          />
        ))}
      </DataTable>
      <ContextMenu global model={items} ref={cm} breakpoint="767px" />
    </div>
  );
};

export default MyTasksTable;
