import { connect } from "react-redux";
import { compose } from "redux";
import { requestData, saveVisibleColumns } from "../../../redux/reducers/total-tasks-reducer";
import { memo } from "react";
import TotalTasksTableContainer from "../Tables/TotalTasksTable/TotalTasksTableContainer";

let mapStateToProps = (state) => {
  return {
    data: state.totalTasks.data,
    columns: state.totalTasks.columns,
    visibleColumns: state.totalTasks.visibleColumns,
    filters: state.totalTasks.filters,
    values: state.totalTasks.values,
    isFetching: state.totalTasks.isFetching,
    totalRecords: state.totalTasks.totalRecords,
  };
};

let mapDispatchToProps = {
    requestData,
    saveVisibleColumns
};

export default compose(
  memo,
  connect(mapStateToProps, mapDispatchToProps),
)(TotalTasksTableContainer);