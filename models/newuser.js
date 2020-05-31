'use strict';
module.exports = (sequelize, DataTypes) => {
  const newUsers = sequelize.define('newUsers', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    

  }, {});
  newUsers.associate = function(models) {
    // associations can be defined here
  };
  return newUsers;
};