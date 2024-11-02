export const getSeverity = (status, field) => {
  switch (field) {
    case "taskStatus":
      switch (status) {
        case "Новая":
          return "info";
        case "В работе":
          return "warning";
        case "Выполнена":
          return "success";
        default:
          return "success";
      }
    case "docAvailability":
      switch (status) {
        case "Загружен":
          return "success";
        case "Отсутствует в СОО":
          return "danger";
        case "Отсутствует в папке":
          return "danger";
        default:
          return "success";
      }
    default:
      break;
  }
};