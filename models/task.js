'use strict';
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    deadline: DataTypes.DATE,
    completion: DataTypes.BOOLEAN,
    DepartmentId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Task.belongsTo(models.Department, {
          foreignKey: 'DepartmentId'
        })
      }
    }
  });
  return Task;
};