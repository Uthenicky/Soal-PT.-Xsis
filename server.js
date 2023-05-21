const express = require('express')
require('dotenv').config()
const env = process.env

const bodyParser = require('body-parser')
const cors = require('cors')
const swagger = require('./swagger')
const db = require("./models")

const User = db.User
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Drop and Resync Db")
  initial()
})

var corsOptions = {
  credentials: true,
  origin: [env.URL_1, env.URL_2]
}

const app = express()
swagger(app)
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// ROUTES
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    status: 200,
    message: 'Wellcome To The Jungle'
  })
})

require('./routes/movie')(app)
require('./routes/user')(app)

const PORT = 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

// insert user buat tes API
function initial() {
  User.create({
    username: 'admin',
    password: 'admin',
    role: 'admin',
  })

  User.create({
    username: 'superadmin',
    password: 'superadmin',
    role: 'superadmin',
  })
}