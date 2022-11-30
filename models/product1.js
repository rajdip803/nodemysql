'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product1 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product1.init({
    id_of_product: DataTypes.INTEGER,
    name_product: DataTypes.STRING,
    price: DataTypes.INTEGER,
    timestamps: false
  }, {
    sequelize,
    modelName: 'product1',
  });
  return product1;
};