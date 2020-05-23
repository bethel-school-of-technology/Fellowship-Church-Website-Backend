'use strict';
module.exports = (sequelize, DataTypes) => {
  const NewUser = sequelize.define('NewUser', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    userId: {
    type: DataTypes.INTEGER,
    praimaryKey: true
    },
    

  }, {});
  NewUser.associate = function(models) {
    // associations can be defined here
  };
  return NewUser;
};