require('dotenv').config()
const env = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(env.DB, env.USER, env.PASSWORD, {
  host: env.HOST,
  port: env.PORT,
  dialect: env.DIALECT,
  timestamps: true,
  sync: true,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})

// cek koneksi
connection = (async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.')
  } catch (err) {
    console.error('Unable to connect to the database: ', err)
  }
})

const db = {};
db.sequelize = sequelize
db.Sequelize = Sequelize


// MODELS
db.Movie = require('./movieModel')(sequelize, Sequelize)
db.User = require('./userModel')(sequelize, Sequelize)
db.Log = require('./logModel')(sequelize, Sequelize)

// Relation
db.Log.belongsTo(db.User)
db.Log.belongsTo(db.Movie)


module.exports = db;
