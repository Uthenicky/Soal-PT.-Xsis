const {User} = require('../models')
var jwt = require('jsonwebtoken')
require('dotenv').config()
const env = process.env


exports.Login = async (req, res) => {
  username = req.body['username']
  password = req.body['password']

  if(username && password){
    try {
      // cek user
      const cek_user = await User.findOne({
        where: {
          username: username
        }
      })

      if(!cek_user){
        res.status(404).json({
          success: false,
          status: 404,
          message: "Username tidak ada",
        })
      }

      // cek password
      if (password != cek_user.password) {
        return res.status(401).json({
          success: false,
          status: 404,
          message: "Password salah",
        })
      }

      var token = jwt.sign({
        id: cek_user.id,
      },
        env.SECRET_KEY,{
        // exp 24 jam
        expiresIn: 86400,
      })

      res.status(200).json({
        success: true,
        status: 200,
        data: {
          user: cek_user,
          token: token,
        },
      })
      
    } catch (err) {
      res.status(500).json({
        success: false,
        status: 500,
        message: err.message,
      })
    }
  } else {
    res.status(400).json({
      success: false,
      status: 400,
      message: "Username dan password tidak boleh kosong",
    })
  }
}