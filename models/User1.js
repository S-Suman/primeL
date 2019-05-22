const Sequelize = require('sequelize')
const db1 = require('../database/db1.js')

module.exports = db1.sequelize.define(
  'user1',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    company_name: {
      type: Sequelize.STRING
    },
    contact_name: {
      type: Sequelize.STRING
    },
    contact_Telephone: {
        type: Sequelize.INTEGER
      },
    contact_Mobile: {
        type: Sequelize.INTEGER
      },
    contact_Role: {
        type: Sequelize.STRING
      },
    companyTotalEmployees: {
        type: Sequelize.STRING
      },
    companyITEmployees: {
        type: Sequelize.STRING
      },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false
  }
)
