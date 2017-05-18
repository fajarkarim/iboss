'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Tasks', [{
      name: "Meet and greet with users",
      deadline: "January",
      completion: false,
      DepartmentId: 1,
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: "Go to market for inspection",
      deadline: "February",
      completion: false,
      DepartmentId: 2,
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: "Blood donor event",
      deadline: "March",
      completion: false,
      DepartmentId: 3,
      createdAt: new Date,
      updatedAt: new Date
    }], {})
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Task', null, {})
  }
};
