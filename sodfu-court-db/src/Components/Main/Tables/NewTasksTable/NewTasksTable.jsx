import { useState, useEffect, useRef } from "react";
import TableHeader from "../TableHeader/MainTableHeader";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ContextMenu } from "primereact/contextmenu";
import { classNames } from "primereact/utils";
import { getTableHeight } from "../../../../function-helpers/getTableHeight";
import styles from "./NewTasksTable.module.css";
import { getGlobalFilters} from "../Functions/FiltersFunction/GlobalFilterFunctions/globalFilterFunctions";
import { getColumnFilterElement } from "../Functions/FiltersFunction/GetColumnFilterElement/getColumnFilterElement";
import { getColumnBody } from "../Functions/BodyFunctions/GetColumnBody/getColumnBody";
import { changeDateFormat } from "../Functions/changeDateFormat";

const NewTasksTable = (props) => {
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
    getTotalNewRecords,
    distributeToWork,
    users,
  } = props;
  const [filters, setFilters] = useState(sourceFilters);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(props.visibleColumns);
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 1,
    sortField: null,
    sortOrder: null,
    filters: props.filters,
});
const cm = useRef(null);

const items = [
  {
    label: "Распределить в работу",
    icon: "pi pi-pencil",
    items: users.map(user => 
      { return {
        label: user.full_name,
        icon: "pi pi-user",
        command: () => {
          distributeToWork(selectedTasks, lazyState, user.full_name);
        }
    }}
    )
  },
  { label: "Rename", icon: "pi pi-file-edit" },
];

useEffect(() => {
  lazyState.filters = changeDateFormat(lazyState.filters)
  requestData(lazyState)
}, [lazyState]);

useEffect(() => {
  let _lazyState = {...lazyState}
  _lazyState.filters = filters;
  setlazyState(_lazyState)
}, [filters]);

  useEffect(() => {
      getTableHeight()
      getTotalNewRecords()
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
      <DataTable
        dataKey="id"
        className={styles.table}
        value={data}
        size="normal"
        filterDisplay="menu"
        globalFilterFields={getGlobalFilters(props.filters)}
        header={header}
        emptyMessage="No customers found."
        removableSort
        reorderableColumns
        resizableColumns
        columnResizeMode="expand"
        showGridlines
        paginator
        rows={lazyState.rows}
        scrollable
        scrollHeight="auto"
        rowsPerPageOptions={[5, 10, 25, 50, 100, 150, 200, 250]}
        tableStyle={{ minWidth: "50rem" }}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="{first} / {last} из {totalRecords}"
        selection={selectedTasks}
        onSelectionChange={(e) => {setSelectedTasks(e.value)}}
        // onContextMenu={(e) => cm.current.show(e)}
        // onContextMenu={(e) => console.log(cm.current)}
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
      >
        <Column
          selectionMode="multiple"
          headerStyle={{
            width: "3rem",
            backgroundColor: theme === "dark" ? "#161616" : "#f5f5f5",
          }}
        ></Column>
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

export default NewTasksTable;
