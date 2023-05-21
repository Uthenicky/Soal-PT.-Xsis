const {Movie, User} = require('../models')

function findMovie(id){
  return new Promise(resolve => {
    Movie.findByPk(id).then((data) => {
      resolve(data)
    }).catch((err) => {
      throw new Error(err.message)
    })

  })
}

function findUser(id){
  return new Promise(resolve => {
    User.findByPk(id).then((data) => {
      resolve(data)
    }).catch((err) => {
      throw new Error(err.message)
    })

  })
}

function findUsername(username){
  return new Promise(resolve => {
    User.findOne({
      where: {
        username: username
      }
    }).then((data) => {
      resolve(data)
    }).catch((err) => {
      throw new Error(err.message)
    })

  })
}

module.exports = {findUser, findMovie, findUsername}