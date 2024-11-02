import { useState, useEffect, useRef } from "react";
import TableHeader from "../TableHeader/MainTableHeader";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import { ContextMenu } from "primereact/contextmenu";
import { Toast } from 'primereact/toast';
import { classNames } from "primereact/utils";
import { getTableHeight } from "../../../../function-helpers/getTableHeight";
import styles from "./InWorkTasksTable.module.css";
import { getGlobalFilters} from "../Functions/FiltersFunction/GlobalFilterFunctions/globalFilterFunctions";
import { getColumnFilterElement } from "../Functions/FiltersFunction/GetColumnFilterElement/getColumnFilterElement";
import { getColumnBody } from "../Functions/BodyFunctions/GetColumnBody/getColumnBody";
import { changeDateFormat } from "../Functions/changeDateFormat";
import InWorkTaskRulingsDialogContainer from "./Dialogs/Rulings/InWorkTaskRulingsDialogContainer";
import InWorkTaskDecisionsDialogContainer from "./Dialogs/Decisions/InWorkTaskDecisionsDialogContainer";

const InWorkTasksTable = (props) => {
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
    updateData,
    getTotalNewRecords,
  } = props;

  const [filters, setFilters] = useState(sourceFilters);
  const [selectedTask, setSelectedTask] = useState(null);
  const [checkBoxRow, setCheckBoxRow] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(props.visibleColumns);
  const [visibleRulingDialog, setVisibleRulingDialog] = useState(false);
  const [visibleDecisionDialog, setVisibleDecisionDialog] = useState(false);
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
    let _event = { ...event };
    for (const key in _event.filters) {
      if (key.includes("Date")) {
        _event.filters[key].constraints.map((constraint) =>
          constraint.value != null
            ? (constraint.value = constraint.value.setDate(
                constraint.value.getDate() + 1
              ))
            : null
        );
      }
    }
    _event["first"] = 0;
    setlazyState(_event);
  };

const onRowClick = (event) => {
  setSelectedTask(event.data)
  switch (event.data.taskType) {
    case "Анализ документа":

      switch (event.data.docGlobalType) {
        case "Определение":
          setVisibleRulingDialog(true);
          break;
        case "Решение":
          setVisibleDecisionDialog(true)
        default:
          break;
      }
    break;

    case "Ответ на запрос":
      console.log("Диалоговое окно для подготовки ответа на запрос в работе!");
      console.log(event.data);
    default:
      break;
  }
  setTimeout(() => {
    event.data.sodfuNumber != ""
      ? navigator.clipboard
          .writeText(event.data.sodfuNumber)
          .then(() => {
            toastRowSelect.current.show({
              severity: "success",
              summary: "Скопировано",
              detail: event.data.sodfuNumber,
              life: 1000,
            });
          })
          .catch((err) => {
            console.log("Can't copy to clipboard", err);
          })
      : navigator.clipboard
          .writeText(event.data.incomingNumber.split("-")[0])
          .then(() => {
            toastRowSelect.current.show({
              severity: "success",
              summary: "Скопировано",
              detail: event.data.incomingNumber.split("-")[0],
              life: 1000,
            });
          })
          .catch((err) => {
            console.log("Can't copy to clipboard", err);
          });
  }, 10);
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
      {selectedTask && (
        <InWorkTaskRulingsDialogContainer
          visibleDialog={visibleRulingDialog}
          setVisibleDialog={setVisibleRulingDialog}
          selectedTask={selectedTask}
          updateData={updateData}
          lazyState={lazyState}
          employer={userAuth.fullName}
          getTotalNewRecords={getTotalNewRecords}
          isFetching={isFetching}
        />
      )}
      {selectedTask && (
        <InWorkTaskDecisionsDialogContainer
          visibleDialog={visibleDecisionDialog}
          setVisibleDialog={setVisibleDecisionDialog}
          selectedTask={selectedTask}
          updateData={updateData}
          lazyState={lazyState}
          employer={userAuth.fullName}
          getTotalNewRecords={getTotalNewRecords}
          isFetching={isFetching}
        />
      )}
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
        // expandedRows={expandedRows}
        // onRowToggle={(e) => setExpandedRows(e.data)}
        // rowExpansionTemplate={rowExpansionTemplate}
      >
        {/* {checkBoxRow && <Column
          selectionMode="multiple"
          frozen
          headerStyle={{
            width: "3rem",
            backgroundColor: theme === "dark" ? "#161616" : "#f5f5f5",
          }}
        ></Column>} */}
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

export default InWorkTasksTable;
