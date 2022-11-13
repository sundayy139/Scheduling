'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Handbook extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Handbook.init({
        title: DataTypes.STRING,
        descMarkdown: DataTypes.TEXT('long'),
        descHTML: DataTypes.TEXT('long'),
        image: DataTypes.BLOB('long'),
    }, {
        sequelize,
        modelName: 'Handbook',
    });
    return Handbook;
};