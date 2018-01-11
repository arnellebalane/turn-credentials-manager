const server = require('server');
const pick = require('lodash/pick');
const config = require('./config');
const { post } = server.router;
const { status, json } = server.reply;
const { User } = require('./database/models');

const options = {
    port: config.get('PORT'),
    security: false
};

server(
    options,
    post('/users', async ctx => {
        const data = pick(ctx.data, ['username', 'email']);
        const user = await User.findOne({ where: data });
        if (user) {
            return status(400);
        }

        const result = await User.create(data);
        return json(result.get());
    })
).then(ctx => ctx.log.info(`Server is running at localhost:${ctx.options.port}`));
