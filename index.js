const server = require('server');
const routers = require('auto-load')('routers');
const config = require('./config');
require('./config/agenda');

const options = {
    port: config.get('PORT'),
    security: false
};

server(
    options,
    routers.users,
    routers.credentials
).then(ctx => ctx.log.info(`Server is running at localhost:${ctx.options.port}`));
