import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

export const CourtsListDialog = (props) => {

    const {
      visibleDialog,
      setVisibleDialog,
      selectedTask,
      values,
      updateData,
      employer,
      lazyState,
    } = props;

    let [task, setTask] = useState(selectedTask);

    useEffect(() => {
        setTask(selectedTask);
    }, [selectedTask])

    const headerContent = (
        <div className=''>
            {`Изменение данных`}
        </div>
    );

    const taskDone = async () => {
      await updateData(lazyState, task, employer)
      setVisibleDialog(false)
    }

    const footerContent = (
        <div className=''>
            <Button label="Отмена" icon="pi pi-times" onClick={() => setVisibleDialog(false)} className="p-button-text" />
            <Button label="Сохранить" icon="pi pi-check" onClick={taskDone} autoFocus />
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
          <div className="grid mt-1">
            <div className="col-12">
              <div className="text-left">
                <span className="p-float-label">
                  <InputText
                    className={"w-full"}
                    id="courtName"
                    value={task.courtName}
                    onChange={(e) =>
                      setTask({ ...task, courtName: e.target.value })
                    }
                  />
                  <label htmlFor="courtName">Наименование суда</label>
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="text-left">
                <span className="p-float-label">
                  <Dropdown
                    className={"w-full"}
                    id="courtRegion"
                    value={task.courtRegion}
                    onChange={(e) =>
                      setTask({ ...task, courtRegion: e.target.value })
                    }
                    options={values.courtRegion}
                    filter
                  />
                  <label htmlFor="courtRegion">Регион суда</label>
                </span>
              </div>
            </div>
            <div className="col-4">
              <div className="text-left">
                <span className="p-float-label">
                  <Dropdown
                    className={"w-full"}
                    id="courtGeneralType"
                    value={task.courtGeneralType}
                    onChange={(e) =>
                      setTask({ ...task, courtGeneralType: e.target.value })
                    }
                    options={values.courtGeneralType}
                    filter
                  />
                  <label htmlFor="courtGeneralType">Тип суда</label>
                </span>
              </div>
            </div>
            <div className="col-3">
              <div className="text-left">
                <span className="p-float-label">
                  <Dropdown
                    className={"w-full"}
                    id="cassRegion"
                    value={task.cassRegion}
                    onChange={(e) =>
                      setTask({ ...task, cassRegion: e.target.value })
                    }
                    options={values.cassRegion}
                    filter
                  />
                  <label htmlFor="cassRegion">Кассационный регион</label>
                </span>
              </div>
            </div>
            <div className="col-12">
              <div className="text-left">
                <span className="p-float-label">
                  <InputText
                    className={"w-full"}
                    id="courtAddress"
                    value={task.courtAddress}
                    onChange={(e) =>
                      setTask({ ...task, courtAddress: e.target.value })
                    }
                  />
                  <label htmlFor="courtAddress">Адрес суда</label>
                </span>
              </div>
            </div>
            <div className="col-4">
              <div className="text-left">
                <span className="p-float-label">
                  <InputText
                    className={"w-full"}
                    id="courtPhone"
                    value={task.courtPhone}
                    onChange={(e) =>
                      setTask({ ...task, courtPhone: e.target.value })
                    }
                  />
                  <label htmlFor="courtPhone">Телефон суда</label>
                </span>
              </div>
            </div>
            <div className="col-4">
              <div className="text-left">
                <span className="p-float-label">
                  <InputText
                    className={"w-full"}
                    id="courtEmail"
                    value={task.courtEmail}
                    onChange={(e) =>
                      setTask({ ...task, courtEmail: e.target.value })
                    }
                  />
                  <label htmlFor="courtEmail">Электронная почта</label>
                </span>
              </div>
            </div>
            <div className="col-4">
              <div className="text-left">
                <span className="p-float-label">
                  <InputText
                    className={"w-full"}
                    id="courtSite"
                    value={task.courtSite}
                    onChange={(e) =>
                      setTask({ ...task, courtSite: e.target.value })
                    }
                  />
                  <label htmlFor="courtSite">Сайт суда</label>
                </span>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
}