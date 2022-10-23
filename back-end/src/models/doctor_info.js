'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctor_Info extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Doctor_Info.belongsTo(models.User, { foreignKey: 'doctorId' });
            Doctor_Info.belongsTo(models.AllCode, { foreignKey: 'priceId', targetKey: 'key', as: 'priceData' });
            Doctor_Info.belongsTo(models.AllCode, { foreignKey: 'provinceId', targetKey: 'key', as: 'provinceData' });
            Doctor_Info.belongsTo(models.AllCode, { foreignKey: 'paymentId', targetKey: 'key', as: 'paymentData' });

            Doctor_Info.belongsTo(models.Clinic, { foreignKey: 'clinicId' });
            Doctor_Info.belongsTo(models.Specialty, { foreignKey: 'specialtyId' });
        }
    };
    Doctor_Info.init({
        doctorId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        clinicId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        note: DataTypes.STRING,
        description: DataTypes.TEXT,
        contentMarkdown: DataTypes.TEXT('long'),
        contentHTML: DataTypes.TEXT('long'),
        count: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Doctor_Info',
        freezeTableName: true,
    });
    return Doctor_Info;
};