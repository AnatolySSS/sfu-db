import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { getDbConfig } from "./config/getDbConfig.js";
import router from "./router.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirname = __dirname.replace("backend", "sodfu-court-db");

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(express.static(path.join(dirname, 'build')));
app.use('/', router);

app.get('/*', (request, responce) => {
  responce.sendFile(path.join(dirname, 'build', 'index.html'));
});

const { PORT } = getDbConfig();

app.listen(PORT, () => {
  console.log(`Server is starting on PORT ${PORT}`);
});
