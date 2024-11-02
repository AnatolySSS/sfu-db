export const createRulingTasks = (arr) => {
  return arr.filter(
    (obj) =>
      obj.docGlobalType == "Определение" && obj.caseType == "Истец потребитель"
  );
};

export const createDecisionTasks = (arr) => {
  return arr.filter(
    (obj) =>
      obj.docGlobalType == "Решение" && obj.caseType == "Истец потребитель"
  );
};

export const createRequestTasks = (arr) => {
  return arr.filter(
    (obj) =>
      obj.docType.toLowerCase().includes("запрос")
  );
};