import { connect } from "react-redux";
import { compose } from "redux";
import { requestData, saveVisibleColumns } from "../../../redux/reducers/court-docs-reducer";
import { memo } from "react";
import CourtDocs from "./CourtDocs";

let mapStateToProps = (state) => {
  return {
    data: state.courtDocs.data,
    columns: state.courtDocs.columns,
    visibleColumns: state.courtDocs.visibleColumns,
    filters: state.courtDocs.filters,
    values: state.courtDocs.values,
    isFetching: state.courtDocs.isFetching,
    totalRecords: state.courtDocs.totalFilteredRecords,
  };
};

let mapDispatchToProps =  {
    requestData,
    saveVisibleColumns
};

export default compose(
  memo,
  connect(mapStateToProps, mapDispatchToProps),
)(CourtDocs);