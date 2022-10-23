'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Doctor_Info', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            priceId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            provinceId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            paymentId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            clinicId: {
                type: Sequelize.INTEGER
            },
            specialtyId: {
                type: Sequelize.INTEGER
            },
            note: {
                type: Sequelize.STRING
            },
            description: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            contentMarkdown: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            contentHTML: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            count: {
                allowNull: false,
                defaultValue: 0,
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('Doctor_Info');
    }
};