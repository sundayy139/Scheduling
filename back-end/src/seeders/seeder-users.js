'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'sunday139@gmail.com',
      password: "123456",
      firstName: 'Vo Duy',
      lastName: 'Tam',
      image: "https://sequelize.org/img/logo.svg",
      address:"Vietnam",
      phoneNumber: "12345",
      gender: 1 ,
      roleId: "R1",
      positionId: "PR",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete('Users', null, {});
  }
};
