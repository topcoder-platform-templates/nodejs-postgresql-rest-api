'use strict';

module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('Test', {
    handle: {
      type: DataTypes.STRING,
      unique: true
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    }
  });
  return Test;
};
