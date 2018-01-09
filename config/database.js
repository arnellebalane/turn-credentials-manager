const config = require('./index');

module.exports = {
    development: {
        dialect: 'postgres',
        url: config.get('DATABASE_URL')
    },
    production: {
        dialect: 'postgres',
        url: config.get('DATABASE_URL')
    }
};
