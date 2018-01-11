const pick = require('lodash/pick');
const { post } = require('server/router');
const { status, json } = require('server/reply');
const { User } = require('../database/models');

module.exports = [
    post('/users', async ctx => {
        const data = pick(ctx.data, ['username', 'email']);
        const user = await User.findOne({ where: data });
        if (user) {
            return status(400);
        }

        const result = await User.create(data);
        return json(result.get());
    })
];
