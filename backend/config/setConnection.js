import { createPool } from "mysql2";
import { getDbConfig } from "./getDbConfig.js";

export const setConnection = () => {
  const { config } = getDbConfig();
  let connection = createPool(config);
  connection.getConnection(function (error) {
    if (error) {
      return console.error("Ошибка " + error.message);
    } else {
      console.log("Подключение прошло успешно");
    }
  });
  return { connection };
};
