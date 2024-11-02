import { Sequelize } from "sequelize";
import userModel from "./user.model.js";
import courtDocsModel from "./courtDocs.model.js";
import courtDocsLogModel from "./courtDocsLog.model.js";
import tasksModel from "./tasks.model.js";
import valuesModel from "./values.model.js";
import courtsModel from "./courts.model.js";
import CourtsLogModel from "./CourtsLog.model.js";
import { getDbConfig } from "../config/getDbConfig.js";

const { config } = getDbConfig()

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
  operatorsAliases: 0,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = userModel(sequelize, Sequelize)
db.user.sync()
db.courtDocs = courtDocsModel(sequelize, Sequelize)
db.courtDocs.sync()
db.courtDocsLog = courtDocsLogModel(sequelize, Sequelize)
db.courtDocsLog.sync()
db.tasks = tasksModel(sequelize, Sequelize)
db.tasks.sync()
db.values = valuesModel(sequelize, Sequelize)
db.values.sync()
db.courts = courtsModel(sequelize, Sequelize)
db.courts.sync()
db.courtsLog = CourtsLogModel(sequelize, Sequelize)
db.courtsLog.sync()

export default db