'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Khoa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Khoa.hasMany(models.Student,{foreignKey:'id'})
    }
  }
  Khoa.init({
    nameKhoa: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Khoa',
  });
  return Khoa;
};