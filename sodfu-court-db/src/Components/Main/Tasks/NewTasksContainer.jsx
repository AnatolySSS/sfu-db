import { connect } from "react-redux";
import { compose } from "redux";
import { requestData, saveVisibleColumns, getTotalNewRecords, distributeToWork } from "../../../redux/reducers/new-tasks-reducer";
import { memo } from "react";
import NewTasksTableContainer from "../Tables/NewTasksTable/NewTasksTableContainer";

let mapStateToProps = (state) => {
  return {
    data: state.newTasks.data,
    columns: state.newTasks.columns,
    visibleColumns: state.newTasks.visibleColumns,
    filters: state.newTasks.filters,
    values: state.newTasks.values,
    isFetching: state.newTasks.isFetching,
    totalRecords: state.newTasks.totalRecords,
    // selectedTasks: state.newTasks.selectedTasks,
    users: state.users.users,
  };
};

let mapDispatchToProps = {
    requestData,
    saveVisibleColumns,
    // setSelectedTasks,
    getTotalNewRecords,
    distributeToWork,
};

export default compose(
  memo,
  connect(mapStateToProps, mapDispatchToProps),
)(NewTasksTableContainer);