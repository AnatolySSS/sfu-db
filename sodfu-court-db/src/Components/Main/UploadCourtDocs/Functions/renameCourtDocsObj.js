export const renameCourtDocsObj = (arr) => {
  return arr.map((obj) => {
    if (Object.keys(obj).length > 1) {
      let newObj = {};
      for (const key in obj) {
        switch (key.trim()) {
          case "Входящий номер":
            newObj["incomingNumber"] = obj[key];
            break;
          case "Дата регистрации":
            newObj["incomingDate"] = obj[key];
            break;
          case "Вид документа":
            newObj["docType"] = obj[key];
            break;
          case "Корреспондент":
            newObj["correspondantName"] = obj[key];
            break;
          case "Суд":
            newObj["courtName"] = obj[key];
            break;
          case "ФИО Заявителя":
            newObj["applicant"] = obj[key];
            break;
          case "Тип судебного дела":
            newObj["caseType"] = obj[key];
            break;
          case "№ обращения":
            newObj["sodfuNumber"] = obj[key];
            break;
          case "Имеется запрос":
            newObj["hasRequest"] = obj[key];
            break;
          case "Краткое содержание":
            newObj["expeditionEmployeeComment"] = obj[key];
            break;
          default:
            break;
        }
      }
      return newObj;
    } else {
      return null;
    }
  }).filter((arr) => arr !== null);
};