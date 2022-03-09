'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.belongsToMany(models.Subjects,{through:"StudentSubjects",as:'Subjects',SforeignKey: 'id'});
      Student.belongsToMany(models.Lop,{through:"StudentLop"});
      Student.belongsTo(models.Khoa,{foreignKey:"id"});

    }
  }
  Student.init({
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};