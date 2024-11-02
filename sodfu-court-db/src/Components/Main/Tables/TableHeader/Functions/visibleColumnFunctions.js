export const onColumnToggle =
  (columns, setVisibleColumns, saveVisibleColumns) => (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol) => sCol.field === col.field)
    );

    setVisibleColumns(orderedSelectedColumns);
    saveVisibleColumns(orderedSelectedColumns);
  };