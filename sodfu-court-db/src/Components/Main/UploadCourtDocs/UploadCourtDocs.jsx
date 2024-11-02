import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import * as XLSX from "xlsx";
import { deleteRows } from "./Functions/deleteExcelRow";
import { renameCourtDocsObj } from "./Functions/renameCourtDocsObj";
import { changeDateCourtDocsObj } from "./Functions/changeDateCourtDocsObj";
import { trimCourtDocsObj } from "./Functions/trimCourtDocsObj";
import { fillCaseType_changeDocType } from "./Functions/fillCaseType_changeDocType";
import { fillRequest } from "./Functions/fillRequest";
import styles from "./UploadCourtDocs.module.css"
import { classNames } from "primereact/utils";
import { fillDocGlobalType } from "./Functions/fillDocGlobalType";
import { fillAnalized } from "./Functions/fillAnalized";
import { createDecisionTasks, createRulingTasks, createRequestTasks } from "./Functions/isNeedTask";
import { fillTaskType, fillRequestTaskType } from "./Functions/fillTaskType";
import { fillUniqueNumber } from "./Functions/fillUniqueNumber";
import { fillSodfuNumber } from "./Functions/fillSodfuNumber";

export const UploadCourtDocs = (props) => {
  const { uploadData, theme, isFetching, getTotalNewRecords, getTotalInWorkRecords, totalRecords, userAuth } = props;
  const [totalSize, setTotalSize] = useState(0);
  const toast = useRef(null);
  const fileUploadRef = useRef(null);
  let uniqueNumber = totalRecords;

  const onTemplateSelect = (e) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
  };

  const onTemplateUpload = (e) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    console.log('Начался процесс загрузки');
    toast.current.show({
      severity: "success",
      summary: "Загрузка",
      detail: "Начался процесс загрузки",
    })
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 100000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : '0 B';
    return (
      <div
        className={className}
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <div >{ isFetching && "Идет загрузка..." }</div>
        <div className="flex align-items-center gap-3 ml-auto">
          <span>{formatedValue} / 10 MB</span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: '10rem', height: '12px' }}
          ></ProgressBar>
        </div>
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: '70%' }}>
          <img
            alt={file.name}
            role="presentation"
            src={require("../../../img/excel-logo.png")}
            width={80}
          />
          <span className="flex flex-column text-left ml-5">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag
          value={props.formatSize}
          severity="warning"
          className="px-3 py-2"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column">
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: '5em',
            borderRadius: '50%',
            backgroundColor: 'var(--surface-b)',
            color: 'var(--surface-d)',
          }}
        ></i>
        <span
          style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }}
          className="my-5"
        >
          Drag and Drop Image Here
        </span>
      </div>
    );
  };

  const onUpload = ({ files }) => {
    files.forEach((file, index, arr) => {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);

      fileReader.onload = async (e) => {
        let data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        let worksheet = workbook.Sheets[workbook.SheetNames[0]];

        //Удаление первой строки в файле excel.
        //TODO: проработать вопрос автоматической проерки на наличи первой строки и необходимости ее удаления
        deleteRows(worksheet, 0, 1);

        let uploadObj = {
          courtDocs: [],
          courtTasks: {
            rulings: [],
            decisions: [],
          },
        };

        uploadObj.courtDocs = XLSX.utils.sheet_to_json(worksheet, { blankrows: true });
        uploadObj.courtDocs = renameCourtDocsObj(uploadObj.courtDocs);
        uploadObj.courtDocs = trimCourtDocsObj(uploadObj.courtDocs);
        uploadObj.courtDocs = changeDateCourtDocsObj(uploadObj.courtDocs);
        uploadObj.courtDocs = fillCaseType_changeDocType(uploadObj.courtDocs);
        uploadObj.courtDocs = fillRequest(uploadObj.courtDocs);
        uploadObj.courtDocs = fillSodfuNumber(uploadObj.courtDocs);
        uploadObj.courtDocs = fillDocGlobalType(uploadObj.courtDocs);
        uploadObj.courtDocs = fillAnalized(uploadObj.courtDocs);
        uploadObj.courtDocs = fillUniqueNumber(uploadObj.courtDocs, uniqueNumber);

        uploadObj.courtTasks.rulings = createRulingTasks(uploadObj.courtDocs);
        uploadObj.courtTasks.rulings = fillTaskType(uploadObj.courtTasks.rulings);
        uploadObj.courtTasks.decisions = createDecisionTasks(uploadObj.courtDocs);
        uploadObj.courtTasks.decisions = fillTaskType(uploadObj.courtTasks.decisions);
        uploadObj.courtTasks.requests = createRequestTasks(uploadObj.courtDocs);
        uploadObj.courtTasks.requests = fillRequestTaskType(uploadObj.courtTasks.requests);

        uniqueNumber += uploadObj.courtDocs.length;
        
        await uploadData(uploadObj);
        await getTotalNewRecords();
        userAuth.fullName && await getTotalInWorkRecords(userAuth.fullName)
      };
    });
  };

  const chooseOptions = {
    icon: 'pi pi-fw pi-file-excel',
    iconOnly: true,
    className: 'custom-choose-btn p-button-rounded p-button-outlined',
  };
  const uploadOptions = {
    icon: 'pi pi-fw pi-cloud-upload',
    iconOnly: true,
    className:
      'custom-upload-btn p-button-success p-button-rounded p-button-outlined',
  };
  const cancelOptions = {
    icon: 'pi pi-fw pi-times',
    iconOnly: true,
    className:
      'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined',
  };

  return (
    <div className={classNames(
      "card flex justify-content-center",
      styles.cardStyle,
      theme === "dark" ? styles.cardStyleDark : styles.cardStyleLight
    )}>
      <Toast ref={toast}></Toast>

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload
        ref={fileUploadRef}
        // mode="advanced"
        name="demo[]"
        multiple
        url="/courtdocs/upload"
        accept=".xlsx, .xls"
        maxFileSize={10000000}
        customUpload={true}
        onUpload={onTemplateUpload}
        onSelect={onTemplateSelect}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        uploadHandler={onUpload}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
        style={{ width: '100%' }}
      />
    </div>
  );
};
