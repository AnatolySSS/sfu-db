import { connect } from "react-redux";
import { compose } from "redux";
import { memo } from "react";
import { InWorkTaskDecisionsDialog } from "./InWorkTaskDecisionsDialog";

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
)(InWorkTaskDecisionsDialog);