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
      deadline: new Date,
      completion: false,
      deptId: 1,
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: "Go to market for inspection",
      deadline: new Date,
      completion: false,
      deptId: 2,
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: "Blood donor event",
      deadline: new Date,
      completion: false,
      deptId: 3,
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
