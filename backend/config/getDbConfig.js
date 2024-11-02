import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import * as path from "path";
import { getCurrentIP } from "./getCurrentIP.js";

export const getDbConfig = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  dotenv.config({ path: path.resolve(__dirname, "../.env") });

  let currentIP = getCurrentIP();
  let config;
  let PORT;

  switch (currentIP) {
    case "10.205.24.14":
      console.log("Это sodfu");
      PORT = 3005;
      //sodfu
      config = {
        connectionLimit : 10,
        host: process.env.DB_SODFU_HOST,
        PORT: process.env.DB_SODFU_PORT,
        DB: process.env.DB_SODFU_DB,
        USER: process.env.DB_SODFU_USER,
        PASSWORD: process.env.DB_SODFU_PASSWORD,
        dialect: "mysql",
      };
      break;

    default:
      console.log("Это localhost");
      PORT = 3005;
      //localhost
      config = {
        connectionLimit : 10,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DB,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        dialect: "mysql",
      };
      break;
  }

  return { PORT, config };
};
