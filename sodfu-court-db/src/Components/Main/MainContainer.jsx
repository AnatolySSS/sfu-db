import { connect } from "react-redux";
import { compose } from "redux";
import { updateTheme } from "../../redux/reducers/auth-reducer";
import { memo } from "react";
import { withAuthNavigate } from "../../hoc/withAuthNavigate";
import Main from "./Main";
import { logout } from "../../redux/reducers/auth-reducer";
import { getTotalInWorkRecords } from "../../redux/reducers/inwork-tasks-reducer";

let mapStateToProps = (state) => {
  return {
    theme: state.auth.theme,
    userAuth: state.auth,
    selectedTasks: state.newTasks.selectedTasks,
    totalNewRecords: state.newTasks.totalNewRecords,
    totalInWorkRecords: state.inworkTasks.totalInWorkRecords,
  };
};

let mapDispatchToProps = {
  updateTheme,
  logout,
  getTotalInWorkRecords,
};

// export default connect(mapStateToProps, mapDispatchToProps)(TableCraft)

export default compose(
  memo,
  connect(mapStateToProps, mapDispatchToProps),
  withAuthNavigate
)(Main);