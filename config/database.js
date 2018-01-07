const config = require('./index');

module.exports = {
    development: {
        dialect: 'pg',
        url: config.get('DATABASE_URL')
    },
    production: {
        dialect: 'pg',
        url: config.get('DATABASE_URL')
    },
    turn: {
        dialect: 'pg',
        url: config.get('TURN_DATABASE_URL')
    }
};
