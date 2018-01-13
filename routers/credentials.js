const pick = require('lodash/pick');
const { get } = require('server/router');
const { status, json } = require('server/reply');
const { Credential, User } = require('../database/models');

module.exports = [
    get('/credentials', async ctx => {
        const data = pick(ctx.data, ['username', 'realm']);
        const user = await User.findOne({ where: { username: data.username } });
        if (!user) return status(403);

        return status(200);
    })
];
