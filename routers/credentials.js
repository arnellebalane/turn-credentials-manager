const { URL } = require('url');
const { get } = require('server/router');
const { status, json } = require('server/reply');
const { Op } = require('sequelize');
const addSeconds = require('date-fns/add_seconds');
const crypto = require('crypto');
const { Credential, User, TurnSecret } = require('../database/models');
const config = require('../config');

async function createTurnSecret() {
    const buffer = crypto.randomBytes(128);
    return TurnSecret.create({
        realm: config.get('TURN_DEFAULT_REALM'),
        value: buffer.toString('hex')
    });
}

async function createCredential(user, username, origin) {
    const validity = config.get('CREDENTIAL_VALIDITY');
    const turnSecret = await createTurnSecret(origin);
    const hmac = crypto.createHmac('sha1', turnSecret.value);

    const expiresOn = addSeconds(Date.now(), validity);
    const timestamp = Math.floor(expiresOn.getTime() / 1000);
    const tempUsername = timestamp + ':' + username;
    const password = hmac.update(tempUsername).digest('base64');

    return Credential.create({
        userId: user.id,
        username: tempUsername,
        password: password,
        origin: origin,
        validity: validity,
        expiresOn: expiresOn,
        secret: turnSecret.value
    });
}

function formatCredential(credential) {
    const realm = config.get('TURN_DEFAULT_REALM');

    const now = Date.now();
    const ttl = Math.floor((credential.expiresOn.valueOf() - now.valueOf()) / 1000);

    return {
        username: credential.username,
        password: credential.password,
        ttl: ttl,
        uris: [
            `turn:${realm}`,
            `turns:${realm}`
        ]
    };
}

module.exports = [
    get('/credentials', async ctx => {
        const { username } = ctx.query;
        const user = await User.findOne({ where: { username } });
        if (!user) return status(403);

        if (!ctx.headers.referer) return status(403);
        const origin = new URL(ctx.headers.referer).host;
        const origins = await user.getOrigins({ where: { value: origin } });
        if (!origins.length) return status(403);

        const credentials = await user.getCredentials({
            where: {
                origin: origin,
                expiresOn: {
                    [Op.gt]: Date.now()
                }
            }
        });
        if (credentials.length > 0) {
            return json(formatCredential(credentials[0]));
        }
        const credential = await createCredential(user, username, origin);
        return json(formatCredential(credential));
    })
];
