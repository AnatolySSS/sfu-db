import { connect } from "react-redux";
import { compose } from "redux";
import { memo } from "react";
import { InWorkTaskRulingsDialog } from "./InWorkTaskRulingsDialog";

let mapStateToProps = (state) => {

  return {
    values: state.dropdownValues.values,
  };
};

let mapDispatchToProps =  {

};

export default compose(
  memo,
  connect(mapStateToProps, mapDispatchToProps),
)(InWorkTaskRulingsDialog);