const server = require('server');
const routers = require('auto-load')('routers');
const config = require('./config');
const { error } = server.router;
const { status, send } = server.reply;
require('./config/agenda');

const options = {
    port: config.get('PORT'),
    security: false
};

server(
    options,
    routers.users,
    routers.credentials,
    routers.origins,

    error(ctx => status(500).send(ctx.error.message))
).then(ctx => ctx.log.info(`Server is running at localhost:${ctx.options.port}`));
