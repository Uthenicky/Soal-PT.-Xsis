const jwt = require("jsonwebtoken");
require('dotenv').config()
const env = process.env
const {Op} = require('sequelize')

// mod
const {User} = require('../models');

verifyToken = (req, res, next) => {
  let header = req.headers["authorization"];

  if (!header) {
    return res.status(403).send({
      message: "No token provided",
    })
  }

  let token = header.split(' ')[1]

  if (!token) {
    return res.status(403).send({
      message: "No token provided",
    })
  }

  jwt.verify(token, env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized",
      })
    }

    req.id = decoded.id   
    next() 
  })
}

isAdmin = (req, res, next) => {
  User.findOne({
    where: {
      id: req.id,
      role: {
        [Op.or]: ['admin', 'superadmin']
      }
    }
  }).then((data) => {
    if (!data){
      return res.status(403).send({
        message: "Require Admin Role",
      })
    }
    
    next()
  }).catch((err) => {
    return res.status(403).send({
      error: err.message,
      message: "Require Admin Role",
    })
  })
}


isSuperAdmin = (req, res, next) => {
  User.findOne({
    where: {
      id: req.id,
      role: 'superadmin'
    }
  }).then((data) => {
    if (!data){
      return res.status(403).send({
        message: "Require Super Admin Role",
      })
    }
    
    next()
  }).catch((err) => {
    return res.status(403).send({
      error: err.message,
      message: "Require Super Admin Role",
    })
  })
}

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isSuperAdmin: isSuperAdmin,
}

module.exports = authJwt
