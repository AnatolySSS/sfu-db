export default (sequelize, Sequelize) => {
  const Values = sequelize.define(`valuesList`, ValuesModelObj(Sequelize), {
    tableName: `valuesList`
  });

  return Values;
};

export const ValuesModelObj = (Sequelize) => {return {
  docType: {
    type: Sequelize.STRING,
  },
  docAvailability: {
    type: Sequelize.STRING,
  },
  docNegatives: {
    type: Sequelize.STRING,
  },
  caseType: {
    type: Sequelize.STRING,
  },
  decisionGlobalType: {
    type: Sequelize.STRING,
  },
  decisionType: {
    type: Sequelize.STRING,
  },
  firstInstanceResult: {
    type: Sequelize.TEXT,
  },
  finalResult: {
    type: Sequelize.TEXT,
  },
  courtRegion: {
    type: Sequelize.TEXT,
  },
  cassRegion: {
    type: Sequelize.STRING,
  },
  courtGeneralType: {
    type: Sequelize.STRING,
  },
}}