const path = require('path');
const nconf = require('nconf');

nconf
    .argv({ parseValues: true })
    .env({ parseValues: true })
    .file('secrets', path.resolve(__dirname, 'secrets.json'))
    .defaults({
        PORT: 3000,
        NODE_ENV: 'development'
    });

module.exports = nconf;
