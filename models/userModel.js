
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    username: {
      type:Sequelize.STRING(200),
      allowNull: false,
      unique: true,
    },
    password: {
      type:Sequelize.STRING(200),
      allowNull: false
    },
    role: {
      type: Sequelize.STRING(15),
      defaultValue: 'admin',
      validate: {
        customValidator: (value) => {
          const enums = ['admin', 'superadmin']
          if (!enums.includes(value)) {
              throw new Error('not a valid option')
          }
        }
      }
    },
  }, {timestamps: false})

  return User;
}