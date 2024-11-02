import db from "../models/_index.js";
import { getFilterObj } from "./Functions/getFilterObj.js";
import { getValues } from "./Functions/getValues.js";
const CourtDocs = db.courtDocs;
const Tasks = db.tasks;

export const tasksController = {
  async getData(request, responce) {
    try {
      let { first, rows, sortField, sortOrder, filters } = request.body.data;

      let filterObj = getFilterObj(filters);

      //Получение ВСЕХ задач
      let { count: totalCount, rows: totalDocs } = await Tasks.findAndCountAll({
        where: filterObj,
        raw: true,
        offset: first,
        limit: rows,
        order: [
          sortField
            ? [`${sortField}`, sortOrder == -1 ? "DESC" : "ASC"]
            : ["id", "ASC"],
        ],
      });

      totalDocs = totalDocs.map((task) => {
        return {
          ...task,
          docNegatives: task.docNegatives ? task.docNegatives.split(",") : [],
        };
      });

      const valuesArr = [];
      for (const key in filters) {
        filters[key].matchMode == "in" && valuesArr.push(key);
      }

      let valuesFromDb = await Tasks.findAll({
        attributes: valuesArr,
        where: filterObj,
        raw: true,
      });

      let values = getValues(valuesArr, valuesFromDb);

      //Получение НОВЫХ задач
      filterObj.taskStatus = "Новая";
      let { count: newCount, rows: newDocs } = await Tasks.findAndCountAll({
        where: filterObj,
        raw: true,
        offset: first,
        limit: rows,
        order: [
          sortField
            ? [`${sortField}`, sortOrder == -1 ? "DESC" : "ASC"]
            : ["id", "ASC"],
        ],
      });

      newDocs = newDocs.map((task) => {
        return {
          ...task,
          docNegatives: task.docNegatives ? task.docNegatives.split(",") : [],
        };
      });

      responce.json({
        resultCode: 0,
        values,
        totalDocs: totalDocs,
        totalCount: totalCount,
        newDocs: newDocs,
        newCount: newCount,
        message: `Данные получены`,
      });
    } catch (err) {
      console.log("error tasksController getData");
      responce.json(err);
    }
  },

  async getTotalNewRecords(request, responce) {
    try {
      let { count } = await Tasks.findAndCountAll({
        where: { taskStatus: "Новая" },
        raw: true,
      });

      responce.json({
        resultCode: 0,
        newCount: count,
        message: `Данные получены`,
      });
    } catch (err) {
      console.log("error totalTasksController getTotalRecords");
      responce.json(err);
    }
  },

  async distributeToWork(request, responce) {
    try {
      let { selectedTasks, user } = request.body;

      selectedTasks.forEach(async (task) => {
        let analizedDateTime = new Date(Date.now() + 1000 * 60 * 60 * 3);
        await Tasks.update(
          {
            taskStatus: "В работе",
            analizeEmployeeName: user,
            submittedToWorkDateTime: analizedDateTime,
          },
          {
            where: { uniqueNumber: task.uniqueNumber },
          }
        );
        await CourtDocs.update(
          {
            analizeEmployeeName: user,
            submittedToWorkDateTime: analizedDateTime,
          },
          {
            where: { uniqueNumber: task.uniqueNumber },
          }
        );
      });

      responce.json({
        resultCode: 0,
        message: `Данные получены`,
      });
    } catch (err) {
      console.log("error totalTasksController distributeToWork");
      responce.json(err);
    }
  },
};
