export const getGlobalFilters = (filters) =>
  Object.keys(filters).filter((key) => key !== "global");

export const onGlobalFilterChange =
  (lazyfilters, setFilters, setGlobalFilterValue) => (e) => {
    const value = e.target.value;
    let _filters = { ...lazyfilters };

    _filters["global"].value = value == "" ? null : value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

export const clearFilter =
  (sourceFilters, setFilters, setGlobalFilterValue) => () => {
    let _filters = { ...sourceFilters };
    _filters["global"].value = null;

    setFilters(_filters);
    setGlobalFilterValue("");
  };