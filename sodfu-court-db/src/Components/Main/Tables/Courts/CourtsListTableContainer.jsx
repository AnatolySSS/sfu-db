import { connect } from "react-redux";
import { compose } from "redux";
import { memo } from "react";
import CourtsListTable from "./CourtsListTable";
import { saveVisibleColumns, updateData, requestData } from "../../../../redux/reducers/court-list-reducer";

let mapStateToProps = (state) => {

  return {
    theme: state.auth.theme,
    courts: state.courtList.courts,
    columns: state.courtList.columns,
    visibleColumns: state.courtList.visibleColumns,
    filters: state.courtList.filters,
    isFetching: state.courtList.isFetching,
    values: state.courtList.values,
    employer: state.auth.fullName,
    totalRecords: state.courtList.totalRecords,
  };
};

let mapDispatchToProps =  {
  saveVisibleColumns,
  updateData,
  requestData,
};

export default compose(
  memo,
  connect(mapStateToProps, mapDispatchToProps),
)(CourtsListTable);