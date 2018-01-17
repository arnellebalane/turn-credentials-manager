const { post } = require('server/router');
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
        const { email, origin } = ctx.data;
        const user = await User.findOne({ where: { email } });
        if (!user) return status(403);

        const [instance, created] = await findOrCreateOrigin(user, origin);
        return created ? status(201) : status(200);
    })
];
