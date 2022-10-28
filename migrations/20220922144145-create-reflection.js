'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reflections', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      succes: {
        type: Sequelize.STRING
      },
      low_point: {
        type: Sequelize.STRING
      },
      take_away: {
        type: Sequelize.STRING
      },
      owner_id: {
        type: Sequelize.STRING
      },
      created_date: {
        type: Sequelize.DATE
      },
      modified_date: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reflections');
  }
};