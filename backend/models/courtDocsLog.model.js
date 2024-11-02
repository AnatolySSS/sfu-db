export default (sequelize, Sequelize) => {
  const CourtDocsLog = sequelize.define(`courtDocsLog`, CourtDocsLogModelObj(Sequelize), {
    tableName: `courtDocsLog`
  });

  return CourtDocsLog;
};

export const CourtDocsLogModelObj = (Sequelize) => {return {
  uniqueNumber: {
    type: Sequelize.STRING,
  },
  changedDateTime: {
    type: Sequelize.DATE,
  },
  changedEmployeeName: {
    type: Sequelize.TEXT,
  },
  changedFiled: {
    type: Sequelize.STRING,
  },
  oldValue: {
    type: Sequelize.TEXT,
  },
  newValue: {
    type: Sequelize.TEXT,
  },
}}