'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Clinic.belongsTo(models.AllCode, { foreignKey: 'provinceId', targetKey: 'key', as: 'provinceDatas' });

      Clinic.hasMany(models.Doctor_Info, { foreignKey: 'clinicId' });
    }
  };
  Clinic.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    descMarkdown: DataTypes.TEXT('long'),
    descHTML: DataTypes.TEXT('long'),
    provinceId: DataTypes.STRING,
    logo: DataTypes.BLOB('long'),
    image: DataTypes.BLOB('long'),
  }, {
    sequelize,
    modelName: 'Clinic',
  });
  return Clinic;
};