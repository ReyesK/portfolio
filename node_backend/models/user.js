'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    familyName: DataTypes.STRING,
    givenName: DataTypes.STRING,
    googleId: DataTypes.STRING,
    locale: DataTypes.STRING,
    name: DataTypes.STRING,
    picture: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};