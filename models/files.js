'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class files extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  files.init({
    file_id: DataTypes.INTEGER,
    timestamps: false
  }, {
    sequelize,
    modelName: 'files',
  });
  return files;
};