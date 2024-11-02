export default (sequelize, Sequelize) => {
  const TotalTasks = sequelize.define(`totalTasks`, TaskModelObj(Sequelize), {
    tableName: `totalTasks`
  });
  return TotalTasks;
};

export const TaskModelObj = (Sequelize) => {return {
  uniqueNumber: {
    type: Sequelize.STRING,
  },
  incomingNumber: {
    type: Sequelize.STRING,
  },
  incomingDate: {
    type: Sequelize.DATEONLY,
  },
  docType: {
    type: Sequelize.TEXT,
  },
  docGlobalType: {
    type: Sequelize.STRING,
  },
  docAvailability: {
    type: Sequelize.STRING,
  },
  caseType: {
    type: Sequelize.STRING,
  },
  correspondantName: {
    type: Sequelize.TEXT,
  },
  courtName: {
    type: Sequelize.TEXT,
  },
  applicant: {
    type: Sequelize.TEXT,
  },
  sodfuNumber: {
    type: Sequelize.STRING,
  },
  hasRequest: {
    type: Sequelize.BOOLEAN,
  },
  expeditionEmployeeComment: {
    type: Sequelize.TEXT,
  },
  submittedToWorkDateTime: {
    type: Sequelize.DATE,
  },
  taskCreateDateTime: {
    type: Sequelize.DATE,
  },
  analizedDateTime: {
    type: Sequelize.DATE,
  },
  analizeEmployeeName: {
    type: Sequelize.STRING,
  },
  analizeEmployeeComment: {
    type: Sequelize.TEXT,
  },
  docNegatives: {
    type: Sequelize.TEXT,
  },
  hasNegative: {
    type: Sequelize.BOOLEAN,
  },
  taskStatus: {
    type: Sequelize.STRING,
  },
  taskType: {
    type: Sequelize.STRING,
  },
  taskSource: {
    type: Sequelize.STRING,
  },
}}