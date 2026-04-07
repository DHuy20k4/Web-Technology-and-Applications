'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const salt = bcrypt.genSaltSync(10);
   const hashPassword = bcrypt.hashSync("123456", salt);

   return queryInterface.bulkInsert('Users', [{
    firstName: 'Admin',
    lastName: 'System',
    email: 'admin@gmail.com',
    password: hashPassword,
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'user@gmail.com',
    password: hashPassword,
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
