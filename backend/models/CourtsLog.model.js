export default (sequelize, Sequelize) => {
  const CourtsLog = sequelize.define(`courtsLog`, CourtsLogModelObj(Sequelize), {
    tableName: `courtsLog`
  });

  return CourtsLog;
};

export const CourtsLogModelObj = (Sequelize) => {return {
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