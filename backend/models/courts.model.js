export default (sequelize, Sequelize) => {
  const Courts = sequelize.define(`courts`, CourtsModelObj(Sequelize), {
    tableName: `courts`
  });

  return Courts;
};

export const CourtsModelObj = (Sequelize) => {return {
  uniqueNumber: {
    type: Sequelize.STRING,
  },
  courtName: {
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
  courtAddress: {
    type: Sequelize.TEXT,
  },
  courtPhone: {
    type: Sequelize.TEXT,
  },
  courtEmail: {
    type: Sequelize.TEXT,
  },
  courtSite: {
    type: Sequelize.TEXT,
  },
}}