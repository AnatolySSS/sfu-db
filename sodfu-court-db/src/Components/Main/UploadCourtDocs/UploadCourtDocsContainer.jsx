import { connect } from "react-redux";
import { compose } from "redux";
import { memo } from "react";
import { UploadCourtDocs } from "./UploadCourtDocs";
import { uploadData } from "../../../redux/reducers/court-docs-reducer";
import { getTotalNewRecords } from "../../../redux/reducers/new-tasks-reducer";
import { getTotalInWorkRecords } from "../../../redux/reducers/inwork-tasks-reducer";
import { getTotalRecords } from "../../../redux/reducers/court-docs-reducer";

let mapStateToProps = (state) => {
  return {
    theme: state.auth.theme,
    isFetching: state.courtDocs.isFetching,
    totalRecords: state.courtDocs.totalRecords,
    userAuth: state.auth,
  };
};

let mapDispatchToProps = {
    uploadData,
    getTotalNewRecords,
    getTotalRecords,
    getTotalInWorkRecords,
};

export default compose(
  memo,
  connect(mapStateToProps, mapDispatchToProps),
)(UploadCourtDocs);