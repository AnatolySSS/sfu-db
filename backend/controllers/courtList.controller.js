import db from "../models/_index.js";
import { getFilterObj } from "./Functions/getFilterObj.js";
import { getValues } from "./Functions/getValues.js";
const Courts = db.courts;
const CourtsLog = db.courtsLog;

export const courtListController = {

  async getData(request, responce) {
    try {
      let { first, rows, sortField, sortOrder, filters } = request.body.lazyState;

      let filterObj = getFilterObj(filters);

      let { count, rows: courts } = await Courts.findAndCountAll({
        where: filterObj,
        raw: true,
        offset: first,
        limit: rows,
        order:[sortField ? [`${sortField}`, sortOrder == -1 ? 'DESC' : 'ASC'] : ['id', 'ASC']],
      });

      //Получчение логов для каждого документа (цикл for...of асинхронный)
      const getLogs = async (courts) => {
        for (const court of courts) {
          let logs = await CourtsLog.findAll({
            where: { uniqueNumber: court.uniqueNumber },
            raw: true,
            order: [['changedDateTime', 'DESC']],
          });
          court.logs = logs;
        }
        return courts;
      }
      courts = await getLogs(courts);

      const valuesArr = []
      for (const key in filters) {
        filters[key].matchMode == 'in' && valuesArr.push(key)
      }

      let valuesFromDb = await Courts.findAll({
        attributes: valuesArr,
        where: filterObj,
        raw: true,
      });

      let values = getValues(valuesArr, valuesFromDb);

      responce.json({
        resultCode: 0,
        courts,
        count,
        values,
        message: `Данные получены`,
      });
    } catch (err) {
      console.log('error courtListController getData');
      responce.json(err);
    }
  },

  async update(request, responce) {
    try {
      let { rowData, employer } = request.body;

      //Проверка на обновление значений
      const originalData = await Courts.findOne({ where: { uniqueNumber: rowData.uniqueNumber }, raw: true, });
      
      let checkedValues = [
        "cassRegion",
        "courtAddress",
        "courtEmail",
        "courtGeneralType",
        "courtName",
        "courtPhone",
        "courtRegion",
        "courtSite",
      ];

      //Запись логов при обновлении значений checkedValues
      for (const key in rowData) {
        if (checkedValues.includes(key)) {
          if (rowData[key] != originalData[key]) {
            let logRow = {
              uniqueNumber: rowData.uniqueNumber,
              changedDateTime: new Date(Date.now() + 1000 * 60 * 60 * 3),
              changedEmployeeName: employer,
              changedFiled: key,
              oldValue: originalData[key],
              newValue: rowData[key],
            }
            await CourtsLog.create(logRow);
          }
        }
      }
      
      delete rowData.id;
      await Courts.update( rowData, { where: { uniqueNumber: rowData.uniqueNumber } });

      responce.json({
        resultCode: 0,
        message: "Данные обновлены",
      });

    } catch (error) {
      console.log('error courtListController update: ' + error );
      responce.json(error);
    }
  },

};
