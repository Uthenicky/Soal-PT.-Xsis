const {Movie, Log, sequelize} = require('../models')
const {findMovie, findUser} = require('../utils/findData')


exports.CreateMovie = async (req, res) => {
  const { title, description, rating, userId, image } = req.body

  try {
    let cek_user = await findUser(userId)
    if(!cek_user){
      res.status(404).json({
        success: false,
        status: 404,
        message: 'User not found',
      })
    }

    const trx = sequelize.transaction(async (t) => {
      const data = await Movie.create({
        title: title, description: description, rating: rating, image: image
      }, {transaction: t})

      await Log.create({action: 'create', userId: userId, movieId: data.id}, {
        transaction: t
      })

      res.status(201).json({
        success: true,
        status: 201,
        data: data,
      })
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    })
  }
}


exports.UpdateMovie = async (req, res) => {
  const { title, description, rating, userId, image, movieId } = req.body
  
  try {
    let cek_movie = await findMovie(movieId)
    if(!cek_movie){
      res.status(400).json({
        success: false,
        status: 400,
        message: 'Data tidak ada',
      })
    }

    let cek_user = await findUser(userId)
    if(!cek_user){
      res.status(404).json({
        success: false,
        status: 404,
        message: 'User tidak ada',
      })
    }

    const trx = sequelize.transaction(async (t) => {
      const data = await Movie.update({
        title: title, description: description, rating: rating, image: image
      }, {
        where: {
          id: movieId
        },
        returning: true
      },{transaction: t})

      await Log.create({action: 'update', userId: userId, movieId: data.id}, {
        transaction: t
      })

      res.status(201).json({
        success: true,
        status: 201,
        data: data[1],
      })
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    })
  }
}


exports.ListMovie = (req, res) => {
  Movie.findAll().then((data) => {
    res.status(201).json({
      success: true,
      status: 201,
      data: data,
    })
  }).catch((err) => {
    res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    })
  })
}


exports.DetailMovie = async (req, res) => {
  const id = req.params.id

  try {
    let cek_movie = await findMovie(id)
    if(!cek_movie){
      res.status(404).json({
        success: false,
        status: 404,
        message: 'Data tidak ada',
      })
    }

    const data = await Movie.findByPk(id)

    res.status(200).json({
      success: true,
      status: 200,
      data: data,
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    })
  }
}


exports.DeleteMovie = async (req, res) => {
  const id = req.params.id

  try {
    let cek_movie = await findMovie(id)
    if(!cek_movie){
      res.status(404).json({
        success: false,
        status: 404,
        message: 'Data tidak ada'
      })
    }

    await Movie.destroy({
      where: {
        id: id
      }
    })

    res.status(200).json({
      success: true,
      status: 200,
      message: 'Data berhasil di hapus',
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    })
  }
}