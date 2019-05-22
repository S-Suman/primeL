const Sequelize = require("sequelize")
const db1 = {}
const sequelize = new Sequelize("node_db1","root1", '',{
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

db1.sequelize = sequelize
db1.sequelize = sequelize

module.exports = db1