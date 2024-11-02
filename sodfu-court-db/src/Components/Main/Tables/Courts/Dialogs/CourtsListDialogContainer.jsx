import { connect } from "react-redux";
import { compose } from "redux";
import { memo } from "react";
import { CourtsListDialog } from "./CourtsListDialog";

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
)(CourtsListDialog);