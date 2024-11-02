import db from "../models/_index.js";
const Values = db.values;
const Courts = db.courts;

export const valuesController = {

  async getValues(request, responce) {
    try {

      let values = await Values.findAll({
        raw: true,
      });

      let courts = await Courts.findAll({
        raw: true,
      });

      //Формирование вспомогательного объекта для наполнения его значениями для списков
      let _values = {}
      for (const key in values[0]) {
        if (key != "id" && key != "createdAt" && key != "updatedAt") {
          _values[key] = [];
        }
      }

      // Наполнение вспомогательного объекта значениями из БД
      values.forEach(obj => {
        for (const key in _values) {
          if (obj[key] != null) {
            _values[key].push(obj[key]);
          }
        }
      });

      //Добавление судов
      _values.courts = [...courts.map(court => court.courtName)];

      responce.json({
        resultCode: 0,
        values: _values,
        message: `Данные получены`,
      });
    } catch (error) {
      console.log('error valuesController getValues');
      console.log(error);
      responce.json(error);
    }
  },

};
