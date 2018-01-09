const server = require('server');
const config = require('./config');

const options = {
    port: config.get('PORT')
};

server(options)
    .then(ctx => ctx.log.info(`Server is running at localhost:${ctx.options.port}`));
