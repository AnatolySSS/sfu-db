import { Router } from "express";
import authJwt from "./middleware/authJwt.js";
import { AuthController } from "./controllers/auth.controller.js";
import { ThemeController } from "./controllers/theme.controller.js";
import { courtDocsController } from "./controllers/courtDocs.controller.js";
import { tasksController } from "./controllers/Tasks.controller.js";
import { myTasksController } from "./controllers/myTasks.controller.js";
import { inWorkTasksController } from "./controllers/inWorkTasks.controller.js";
import { usersController } from "./controllers/users.controller.js";
import { valuesController } from "./controllers/values.controller.js";
import { courtListController } from "./controllers/courtList.controller.js";

const router = new Router()

router.post("/auth/login", AuthController.login);
router.get("/auth/logout", authJwt.verifyToken, AuthController.logout);
router.get("/auth/me", authJwt.verifyToken, AuthController.auth);

router.put("/theme/update", authJwt.verifyToken, ThemeController.update);

router.post("/court/docs/get", courtDocsController.getData);
router.post("/court/docs/upload", courtDocsController.uploadData);
router.get("/court/getTotalRecords", courtDocsController.getTotalRecords);

router.post("/tasks/get", tasksController.getData);
router.get("/tasks/getTotalNewRecords", tasksController.getTotalNewRecords);
router.post("/tasks/distributeToWork", tasksController.distributeToWork);

router.post("/tasks/my/get", myTasksController.getData);

router.post("/tasks/inwork/get", inWorkTasksController.getData);
router.post("/tasks/inwork/update", inWorkTasksController.update);
router.post("/tasks/inwork/getTotalInWorkRecords", inWorkTasksController.getTotalInWorkRecords);

router.get("/users/get", usersController.getUsers);

router.post("/courtlist/get", courtListController.getData);
router.post("/courtlist/update", courtListController.update);

router.get("/values/get", valuesController.getValues);

export default router