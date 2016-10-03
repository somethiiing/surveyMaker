'use strict';
module.exports = function(sequelize, DataTypes) {
  var Take = sequelize.define('Take', {
    link: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Take;
};
