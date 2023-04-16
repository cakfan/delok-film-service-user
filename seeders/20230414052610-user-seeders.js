'use strict'
require('dotenv').config()
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const md5 = require('md5')

const { PASSWORD_SALT, ID_SALT } = process.env

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        uuid: uuidv4(),
        name: "Taufan Fatahillah",
        username: "cakfan",
        email: "admin@jabirdev.com",
        role: "admin",
        password: md5(`${PASSWORD_SALT}.rahasia1234.${PASSWORD_SALT}`),
        created_at: new Date(),
        updated_at: new Date()
      },
      // {
      //   id: await md5(`${ID_SALT}.${new Date().toString()}2.${ID_SALT}`),
      //   uuid: uuidv4(),
      //   name: "User 2",
      //   username: "cakfan2",
      //   email: "member@jabirdev.com",
      //   role: "member",
      //   password: await md5(`${PASSWORD_SALT}.rahasia1234.${PASSWORD_SALT}`),
      //   created_at: new Date(),
      //   updated_at: new Date()
      // }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  }
}