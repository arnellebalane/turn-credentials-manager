const config = require('./index');

module.exports = {
    development: {
        dialect: 'postgres',
        url: config.get('DATABASE_URL')
    },
    production: {
        dialect: 'postgres',
        url: config.get('DATABASE_URL')
    },
    turn: {
        dialect: 'postgres',
        url: config.get('TURN_DATABASE_URL')
    }
};
