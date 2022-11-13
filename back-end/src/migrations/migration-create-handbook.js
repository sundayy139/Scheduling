'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Handbooks', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            title: {
                allowNull: false,
                type: Sequelize.STRING
            },
            descMarkdown: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            descHTML: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            image: {
                allowNull: false,
                type: Sequelize.BLOB('long')
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Handbooks');
    }
};