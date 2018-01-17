const { URL } = require('url');
const { post, del } = require('server/router');
const { status } = require('server/reply');
const { User, Origin } = require('../database/models');

async function findOrCreateOrigin(user, value) {
    const origins = await user.getOrigins({ where: { value } });
    if (origins.length) return [origins[0], false];

    const origin = await Origin.create({
        userId: user.id,
        value: value
    });
    return [origin, true];
}

module.exports = [
    post('/origins', async ctx => {
        const { email } = ctx.data;
        const origin = new URL(ctx.data.origin).host;

        const user = await User.findOne({ where: { email } });
        if (!user) return status(403);

        const [instance, created] = await findOrCreateOrigin(user, origin);
        return created ? status(201) : status(200);
    }),

    del('/origins', async ctx => {
        const { email } = ctx.data;
        const origin = new URL(ctx.data.origin).host;

        const instance = await Origin.findOne({
            where: {
                value: origin,
            },
            include: [ {
                model: User,
                where: { email, email }
            } ]
        });

        if (instance) {
            await instance.destroy();
            return status(200);
        }
        return status(403);
    })
];
