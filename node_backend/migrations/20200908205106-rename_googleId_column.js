'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Users', 'googleId', 'providerId');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Users', 'providerId', 'googleId');
  }
};
