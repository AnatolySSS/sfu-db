import { connect } from "react-redux";
import { compose } from "redux";
import { requestData, saveVisibleColumns, setSelectedTasks } from "../../../redux/reducers/my-tasks-reducer";
import { getTotalInWorkRecords } from "../../../redux/reducers/inwork-tasks-reducer";
import { updateData } from "../../../redux/reducers/inwork-tasks-reducer";
import { memo } from "react";
import MyTasksTable from "../Tables/MyTasksTable/MyTasksTable";

let mapStateToProps = (state) => {
  return {
    data: state.myTasks.data,
    columns: state.myTasks.columns,
    visibleColumns: state.myTasks.visibleColumns,
    filters: state.myTasks.filters,
    values: state.myTasks.values,
    isFetching: state.myTasks.isFetching,
    totalRecords: state.myTasks.totalRecords,
    totalInWorkRecords: state.inworkTasks.totalInWorkRecords,
    selectedTasks: state.myTasks.selectedTasks,
    theme: state.auth.theme,
    userAuth: state.auth,
  };
};

let mapDispatchToProps = {
    requestData,
    saveVisibleColumns,
    setSelectedTasks,
    getTotalInWorkRecords,
    updateData,
};

export default compose(
  memo,
  connect(mapStateToProps, mapDispatchToProps),
)(MyTasksTable);