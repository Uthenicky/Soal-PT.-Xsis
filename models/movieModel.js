
module.exports = (sequelize, Sequelize) => {
    const Movie = sequelize.define('movies', {
      title: {
        type:Sequelize.STRING(200),
        allowNull: false
      },
      description: {
        type:Sequelize.STRING(200),
        allowNull: false
      },
      rating: {
        type:Sequelize.FLOAT,
        allowNull: false
      },
      image: {
        type:Sequelize.TEXT,
      }
    }, {})

    return Movie;
}