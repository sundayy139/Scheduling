'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AllCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AllCode.hasMany(models.User, { foreignKey: 'positionId', as: 'positionData' });
      AllCode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' });
      AllCode.hasMany(models.Schedule, { foreignKey: 'timeType', as: 'timeTypeData' });
      AllCode.hasMany(models.Doctor_Info, { foreignKey: 'priceId', as: 'priceData' });
      AllCode.hasMany(models.Doctor_Info, { foreignKey: 'provinceId', as: 'provinceData' });
      AllCode.hasMany(models.Doctor_Info, { foreignKey: 'paymentId', as: 'paymentData' });

      AllCode.hasMany(models.Booking, { foreignKey: 'timeType', as: 'timeTypeDataBooking' });

      AllCode.hasMany(models.Clinic, { foreignKey: 'provinceId', as: 'provinceDatas' });
    }
  };
  AllCode.init({
    key: DataTypes.STRING,
    type: DataTypes.STRING,
    value: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'AllCode',
  });
  return AllCode;
};

