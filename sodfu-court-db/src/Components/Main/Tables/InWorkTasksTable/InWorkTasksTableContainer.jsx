import { connect } from "react-redux";
import { compose } from "redux";
import { memo } from "react";
import InWorkTasksTable from "./InWorkTasksTable";

let mapStateToProps = (state) => {

  return {
    theme: state.auth.theme,
  };
};

let mapDispatchToProps =  {

};

export default compose(
  memo,
  connect(mapStateToProps, mapDispatchToProps),
)(InWorkTasksTable);