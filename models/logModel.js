
module.exports = (sequelize, Sequelize) => {
    const Log = sequelize.define('logs', {
      action: {
        type: Sequelize.STRING(15),
        defaultValue: 'read',
        validate: {
          customValidator: (value) => {
            const enums = ['read', 'create', 'delete', 'update']
            if (!enums.includes(value)) {
                throw new Error('not a valid option')
            }
          }
        }
      },
    }, {})

    return Log;
}