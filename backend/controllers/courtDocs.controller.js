import db from "../models/_index.js";
import { getFilterObj } from "./Functions/getFilterObj.js";
import { getValues } from "./Functions/getValues.js";
const CourtDocs = db.courtDocs;
const CourtDocsLog = db.courtDocsLog;
const Tasks = db.tasks;

export const courtDocsController = {

  async uploadData(request, responce) {
    try {
      let { data } = request.body;

      data.courtDocs.forEach(async (obj, i) => {
        await CourtDocs.create(obj);
      });

      data.courtTasks.rulings.forEach(async obj => {
        obj.taskCreateDateTime = new Date(obj.taskCreateDateTime + 1000 * 60 * 60 * 3);
        await Tasks.create(obj);
      });
      data.courtTasks.decisions.forEach(async obj => {
        obj.taskCreateDateTime = new Date(obj.taskCreateDateTime + 1000 * 60 * 60 * 3);
        await Tasks.create(obj);
      });
      data.courtTasks.requests.forEach(async obj => {
        obj.taskCreateDateTime = new Date(obj.taskCreateDateTime + 1000 * 60 * 60 * 3);
        await Tasks.create(obj);
      });
      
      responce.json({
        resultCode: 0,
        message: `Загружено ${data.length} документа`,
      });
    } catch (err) {
      console.log('error courtDocsController uploadData');
      responce.json(err);
    }
  },

  async getData(request, responce) {
    try {
      let { first, rows, sortField, sortOrder, filters } = request.body.data;

      let filterObj = getFilterObj(filters);

      let { count, rows: docs } = await CourtDocs.findAndCountAll({
        where: filterObj,
        raw: true,
        offset: first,
        limit: rows,
        order:[sortField ? [`${sortField}`, sortOrder == -1 ? 'DESC' : 'ASC'] : ['id', 'ASC']],
      });

      docs = docs.map(doc => {return {...doc, docNegatives: doc.docNegatives ? doc.docNegatives.split(',') : []}})

      //Получчение логов для каждого документа (цикл for...of асинхронный)
      const getLogs = async (docs) => {
        for (const doc of docs) {
          let logs = await CourtDocsLog.findAll({ where: { uniqueNumber: doc.uniqueNumber }, raw: true, });
          doc.logs = logs;
        }
        return docs;
      }
      docs = await getLogs(docs);

      //Получение списков выпадающих значений с учетом фильтрации
      const valuesArr = []
      for (const key in filters) {
        filters[key].matchMode == 'in' && valuesArr.push(key)
      }
      
      let valuesFromDb = await CourtDocs.findAll({
        attributes: valuesArr,
        where: filterObj,
        raw: true,
      });

      let values = getValues(valuesArr, valuesFromDb)

      responce.json({
        resultCode: 0,
        docs,
        values,
        totalRecords: count,
        message: `Данные получены`,
      });
    } catch (err) {
      console.log('error courtDocsController getData');
      responce.json(err);
    }
  },

  async getTotalRecords(request, responce) {
    try {

      let { count } = await CourtDocs.findAndCountAll({ raw: true });

      responce.json({
        resultCode: 0,
        totalRecords: count,
        message: `Данные получены`,
      });

    } catch (err) {
      console.log('error courtDocsController getTotalRecords');
      responce.json(err);
    }
  },

};
