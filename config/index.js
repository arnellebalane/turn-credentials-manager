const nconf = require('nconf');

nconf
    .argv({ parseValues: true })
    .env({ parseValues: true })
    .file('secrets', path.resolve(__dirname, 'secrets.json'))
    .file('config', path.resolve(__dirname, 'config.json'))
    .defaults({
        PORT: 3000
    });

module.exports = nconf;
