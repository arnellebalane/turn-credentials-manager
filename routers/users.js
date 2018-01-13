const pick = require('lodash/pick');
const { post } = require('server/router');
const { status } = require('server/reply');
const { User } = require('../database/models');
const Op = User.sequelize.Op;

module.exports = [
    post('/users', async ctx => {
        const data = pick(ctx.data, ['username', 'email']);
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { username: data.username },
                    { email: data.email }
                ]
            }
        });
        if (user) return status(400);

        const result = await User.create(data);
        return status(200);
    })
];
