export const formatDate = (date, dateType = "Date", timeZone = "UTC") => {
  date 
    ? dateType.includes("DateTime")
      ? (date = new Date(date).toLocaleDateString("ru-RU", {
        second: "2-digit",
        minute: "2-digit",
        hour: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: timeZone,
      }))
      : (date = new Date(date).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: timeZone,
      }))
    : (date = null);
  return date;
};