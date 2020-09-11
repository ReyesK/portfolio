'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    message: DataTypes.STRING,
    userId: DataTypes.STRING,
    pagePath: DataTypes.STRING,
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};
