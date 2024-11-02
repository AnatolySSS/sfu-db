import db from "../models/_index.js";
import { getFilterObj } from "./Functions/getFilterObj.js";
import { getValues } from "./Functions/getValues.js";
const Tasks = db.tasks;
const CourtDocs = db.courtDocs;
const CourtDocsLog = db.courtDocsLog;

export const inWorkTasksController = {

  async getData(request, responce) {
    try {
      let { first, rows, sortField, sortOrder, filters } = request.body.lazyState;
      let { employer } = request.body;

      let filterObj = getFilterObj(filters);

      //Получение МОИХ задач в работе
      filterObj.analizeEmployeeName = employer;
      filterObj.taskStatus = "В работе";
      let { count: myCount, rows: myTasks } = await Tasks.findAndCountAll({
        where: filterObj,
        raw: true,
        offset: first,
        limit: rows,
        order:[sortField ? [`${sortField}`, sortOrder == -1 ? 'DESC' : 'ASC'] : ['id', 'ASC']],
      });

      myTasks = myTasks.map(task => {return {...task, docNegatives: task.docNegatives ? task.docNegatives.split(',') : []}})

      const valuesArr = []
      for (const key in filters) {
        filters[key].matchMode == 'in' && valuesArr.push(key)
      }

      let valuesFromDb = await Tasks.findAll({
        attributes: valuesArr,
        where: filterObj,
        raw: true,
      });

      let values = getValues(valuesArr, valuesFromDb)

      responce.json({
        resultCode: 0,
        values,
        tasks: myTasks,
        count: myCount,
        message: `Данные получены`,
      });
    } catch (err) {
      console.log('error inWorkTasksController getData');
      responce.json(err);
    }
  },

  async update(request, responce) {
    try {
      let { rowData, uniqueNumber } = request.body;

      //Проверка на обновление значений
      const originalData = await Tasks.findOne({ where: { uniqueNumber: uniqueNumber }, raw: true, });
      
      let checkedValues = [
        "incomingNumber",
        "incomingDate",
        "docType",
        "caseType",
        "correspondantName",
        "courtName",
        "applicant",
        "sodfuNumber",
        "hasRequest",
      ];

      //Запись логов при обновлении значений checkedValues
      for (const key in rowData) {
        if (checkedValues.includes(key)) {
          if (rowData[key] != originalData[key]) {
            let logRow = {
              uniqueNumber: rowData.uniqueNumber,
              changedDateTime: new Date(rowData.analizedDateTime + 1000 * 60 * 60 * 3),
              changedEmployeeName: rowData.analizeEmployeeName,
              changedFiled: key,
              oldValue: originalData[key],
              newValue: rowData[key],
            }
            await CourtDocsLog.create(logRow);
          }
        }
      }

      //Добавление новой задачи "Ответ на запрос" в случае если в исходных данных не было проставлено значение hasRequest,
      // а в новых данных есть значение "Судебный запрос" в негативе
      if (originalData.hasRequest == false && rowData.docNegatives && rowData.docNegatives.includes("Судебный запрос")) {
        let _rowData = {...rowData};
        _rowData.docGlobalType = "Запрос";
        _rowData.taskStatus = "Новая";
        _rowData.taskType = "Ответ на запрос";
        _rowData.hasRequest = true;
        _rowData.submittedToWorkDateTime = null;
        _rowData.analizedDateTime = null;
        _rowData.analizeEmployeeName = null;
        _rowData.analizeEmployeeComment = null;
        _rowData.taskCreateDateTime = new Date(Date.now() + 1000 * 60 * 60 * 3);
        _rowData.taskSource = "Выявление запроса";
        
        delete _rowData.id;
        delete _rowData.createdAt;
        delete _rowData.updatedAt;
        await Tasks.create(_rowData);
      }

      //Значение даты передаются в формате parse в UTS, поэтому для корректного отображения необходимо добавить 3 часа
      rowData.analizedDateTime = new Date(rowData.analizedDateTime + 1000 * 60 * 60 * 3);
      
      await Tasks.update( rowData, { where: { id: rowData.id } });
      rowData.isAnalized = true;
      delete rowData.id;
      delete rowData.taskStatus;
      delete rowData.taskType;
      await CourtDocs.update( rowData, { where: { uniqueNumber: uniqueNumber } });
      responce.json({
        resultCode: 0,
        message: "Данные обновлены",
      });

    } catch (error) {
      console.log('error inWorkTasksController update: ' + error );
      responce.json(error);
    }
  },

  async getTotalInWorkRecords(request, responce) {
    try {

      let { employer } = request.body;

      let { count } = await Tasks.findAndCountAll({
        where: { taskStatus: "В работе", analizeEmployeeName: employer },
        raw: true,
      });

      responce.json({
        resultCode: 0,
        count,
        message: `Данные получены`,
      });

    } catch (err) {
      console.log('error inWorkTasksController getTotalRecords');
      console.log(err);
      responce.json(err);
    }
  },

};
