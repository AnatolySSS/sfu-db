import db from "../models/_index.js";
import { getFilterObj } from "./Functions/getFilterObj.js";
import { getValues } from "./Functions/getValues.js";
const Tasks = db.tasks;

export const myTasksController = {

  async getData(request, responce) {
    try {
      let { first, rows, sortField, sortOrder, filters } = request.body.lazyState;
      let { employer } = request.body;

      let filterObj = getFilterObj(filters);

      //Получение МОИХ задач
      filterObj.analizeEmployeeName = employer;
      filterObj.taskStatus = "Выполнена";
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

      let values = getValues(valuesArr, valuesFromDb);

      responce.json({
        resultCode: 0,
        values,
        tasks: myTasks,
        count: myCount,
        message: `Данные получены`,
      });
    } catch (err) {
      console.log('error myTasksController getData');
      responce.json(err);
    }
  },

};
