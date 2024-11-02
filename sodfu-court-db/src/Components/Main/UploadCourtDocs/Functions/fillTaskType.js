export const fillTaskType = (arr) => {
    arr.map((obj) => {
      obj.taskType = "Анализ документа";
      obj.taskStatus = "Новая";
      obj.taskCreateDateTime = Date.now();
      obj.taskSource = "Таблица Excel"
    });
    return arr;
}

export const fillRequestTaskType = (arr) => {
  arr.map((obj) => {
    obj.taskType = "Ответ на запрос";
    obj.taskStatus = "Новая";
    obj.taskCreateDateTime = Date.now();
    obj.taskSource = "Таблица Excel"
  });
  return arr;
}