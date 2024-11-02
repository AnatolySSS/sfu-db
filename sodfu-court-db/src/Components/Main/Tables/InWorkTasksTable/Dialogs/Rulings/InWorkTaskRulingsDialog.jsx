import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Fieldset } from 'primereact/fieldset';
import { classNames } from 'primereact/utils';
import { MultiSelect } from 'primereact/multiselect';
import { formatDate } from '../../../../../../function-helpers/formatDate';
import changeDateType from '../../../../../../function-helpers/changeDateType';

export const InWorkTaskRulingsDialog = (props) => {

    const {
      visibleDialog,
      setVisibleDialog,
      selectedTask,
      values,
      updateData,
      lazyState,
      employer,
      getTotalNewRecords,
      isFetching,
    } = props;

    let [task, setTask] = useState(selectedTask);

    useEffect(() => {
        setTask(selectedTask);
    }, [selectedTask])

    const headerContent = (
        <div className=''>
            {`${selectedTask.taskType} (${selectedTask.docGlobalType})`}
        </div>
    );

    const taskDone = async () => {
      task = {...task, hasNegative: task.docNegatives.length == 0 ? false : true}
      task = {...task, docNegatives: task.docNegatives.length == 0 ? null : task.docNegatives.join(',')}
      task = {...task, taskStatus: 'Выполнена'}
      if (task.docNegatives && task.docNegatives.includes("Судебный запрос")) {
        task = {...task, hasRequest: true}
      }
      task = {...task, incomingDate: changeDateType(formatDate(task.incomingDate,"Date","Europe/Moscow"))};
      task.analizedDateTime = Date.now();
      await updateData(lazyState, employer, task, task.uniqueNumber)
      getTotalNewRecords()
      setVisibleDialog(false)
    }

    const footerContent = (
        <div className=''>
            <Button label="Отмена" icon="pi pi-times" onClick={() => setVisibleDialog(false)} className="p-button-text" />
            <Button label="Выполнить" icon="pi pi-check" onClick={taskDone} autoFocus />
        </div>
    );

    return (
      <div className="card flex justify-content-center">
        <Dialog
          header={headerContent}
          visible={visibleDialog}
          style={{ width: "80vw", height: "90vh" }}
          onHide={() => setVisibleDialog(false)}
          footer={footerContent}
        >
          <Fieldset
            className="surface-100 mb-3"
            legend="Проверка документа"
            toggleable
          >
            <div className="grid mt-1">
              <div className="col-3">
                <div className="text-left">
                  <span className="p-float-label">
                    <Dropdown
                      className={"w-full"}
                      id="docAvailability"
                      value={task.docAvailability}
                      onChange={(e) =>
                        setTask({ ...task, docAvailability: e.target.value })
                      }
                      options={values.docAvailability}
                    />
                    <label htmlFor="docAvailability">Наличие документа</label>
                  </span>
                </div>
              </div>
              <div className="col-9">
                <div className="text-left">
                  <span className="p-float-label">
                    <MultiSelect
                      className="w-full"
                      id="docNegatives"
                      value={task.docNegatives}
                      onChange={(e) =>
                        setTask({ ...task, docNegatives: e.target.value })
                      }
                      options={values.docNegatives}
                      display="chip"
                      filter
                      maxSelectedLabels={3}
                    />
                    <label htmlFor="docNegatives">Наличие негатива</label>
                  </span>
                </div>
              </div>
              <div className="col-12">
                <div className="text-left">
                  <span className="p-float-label">
                    <InputTextarea
                      className="w-full"
                      id="analizeEmployeeComment"
                      value={task.analizeEmployeeComment}
                      onChange={(e) =>
                        setTask({
                          ...task,
                          analizeEmployeeComment: e.target.value,
                        })
                      }
                    />
                    <label htmlFor="analizeEmployeeComment">
                      Комментарий исполнителя
                    </label>
                  </span>
                </div>
              </div>
            </div>
          </Fieldset>
          <Fieldset
            className="surface-100"
            legend="Общая информация"
            toggleable
          >
            <div className="grid mt-1">
              <div className="col-3">
                <div className="text-left">
                  <span className="p-float-label">
                    <InputText
                      className={classNames(
                        "w-full",
                        (task.incomingNumber == null ||
                          task.incomingNumber == "") &&
                          "p-invalid"
                      )}
                      id="incomingNumber"
                      value={task.incomingNumber}
                      onChange={(e) =>
                        setTask({ ...task, incomingNumber: e.target.value })
                      }
                    />
                    <label htmlFor="incomingNumber">Входящий номер</label>
                  </span>
                </div>
              </div>
              <div className="col-3">
                <div className="text-left">
                  <span className="p-float-label">
                    <InputText
                      className={classNames(
                        "w-full",
                        (task.sodfuNumber == null || task.sodfuNumber == "") &&
                          "p-invalid"
                      )}
                      id="sodfuNumber"
                      value={task.sodfuNumber}
                      onChange={(e) =>
                        setTask({ ...task, sodfuNumber: e.target.value })
                      }
                    />
                    <label htmlFor="sodfuNumber">№ обращения</label>
                  </span>
                </div>
              </div>
              <div className="col-2">
                <div className="text-left">
                  <span className="p-float-label">
                    <Calendar
                      className={classNames(
                        "w-full",
                        (task.incomingDate == null ||
                          task.incomingDate == "") &&
                          "p-invalid"
                      )}
                      id="incomingDate"
                      value={new Date(task.incomingDate)}
                      onChange={(e) =>
                        setTask({ ...task, incomingDate: e.target.value })
                      }
                    />
                    <label htmlFor="incomingDate">Дата поступления</label>
                  </span>
                </div>
              </div>
              <div className="col-4">
                <div className="text-left">
                  <span className="p-float-label">
                    <Dropdown
                      className={classNames(
                        "w-full",
                        (task.caseType == null || task.caseType == "") &&
                          "p-invalid"
                      )}
                      id="caseType"
                      value={task.caseType}
                      onChange={(e) =>
                        setTask({ ...task, caseType: e.target.value })
                      }
                      options={values.caseType.sort((a, b) =>
                        a.localeCompare(b)
                      )}
                    />
                    <label htmlFor="caseType">Тип судебного дела</label>
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="text-left">
                  <span className="p-float-label">
                    <Dropdown
                      className={classNames(
                        "w-full",
                        (task.docType == null || task.docType == "") &&
                          "p-invalid"
                      )}
                      id="docType"
                      value={task.docType}
                      onChange={(e) =>
                        setTask({ ...task, docType: e.target.value })
                      }
                      options={values.docType.sort((a, b) =>
                        a.localeCompare(b)
                      )}
                      filter
                    />
                    <label htmlFor="docType">Тип документа</label>
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="text-left">
                  <span className="p-float-label">
                    <InputText
                      className={classNames(
                        "w-full",
                        (task.applicant == null || task.applicant == "") &&
                          "p-invalid"
                      )}
                      id="applicant"
                      value={task.applicant}
                      onChange={(e) =>
                        setTask({ ...task, applicant: e.target.value })
                      }
                    />
                    <label htmlFor="applicant">Заявитель</label>
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="text-left">
                  <span className="p-float-label">
                    <InputText
                      className={classNames(
                        "w-full",
                        (task.correspondantName == null ||
                          task.correspondantName == "") &&
                          "p-invalid"
                      )}
                      id="correspondantName"
                      value={task.correspondantName}
                      onChange={(e) =>
                        setTask({ ...task, correspondantName: e.target.value })
                      }
                    />
                    <label htmlFor="correspondantName">Корреспондент</label>
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="text-left">
                  <span className="p-float-label">
                    <Dropdown
                      className={classNames(
                        "w-full",
                        (task.courtName == null || task.courtName == "") &&
                          "p-invalid"
                      )}
                      id="courtName"
                      value={task.courtName}
                      onChange={(e) =>
                        setTask({ ...task, courtName: e.target.value })
                      }
                      options={values.courts}
                      virtualScrollerOptions={{
                        // lazy: true,
                        onLazyLoad: (event) => {},
                        itemSize: 38,
                        showLoader: true,
                        loading: isFetching,
                        // delay: 250,
                      }}
                      filter
                    />
                    <label htmlFor="courtName">Наименование суда</label>
                  </span>
                </div>
              </div>
              {task.note && (
                <div className="col-12">
                  <div className="text-left">
                    <span className="p-float-label">
                      <InputTextarea
                        className={classNames(
                          "w-full",
                          (task.note == null || task.note == "") && "p-invalid"
                        )}
                        id="note"
                        value={task.note}
                        onChange={(e) =>
                          setTask({ ...task, note: e.target.value })
                        }
                        disabled
                      />
                      <label htmlFor="note">Комментарий экпердиции</label>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </Fieldset>
        </Dialog>
      </div>
    );
}