const { URL } = require('url');
const { get } = require('server/router');
const { status, json } = require('server/reply');
const { Op } = require('sequelize');
const addSeconds = require('date-fns/add_seconds');
const crypto = require('crypto');
const { Credential, User, TurnSecret } = require('../database/models');
const config = require('../config');

async function findOrCreateTurnSecret(realm) {
    const turnSecret = await TurnSecret.findOne({ where: { realm } });
    if (turnSecret) return turnSecret;

    const buffer = crypto.randomBytes(128);
    const value = buffer.toString('hex');
    return TurnSecret.create({ realm, value });
}

async function createCredential(user, username, realm) {
    const validity = config.get('CREDENTIAL_VALIDITY');
    const turnSecret = await findOrCreateTurnSecret(realm);
    const hmac = crypto.createHmac('sha1', turnSecret.value);

    const expiresOn = addSeconds(Date.now(), validity);
    const timestamp = Math.floor(expiresOn.getTime() / 1000);
    const tempUsername = timestamp + ':' + username;
    const password = hmac.update(tempUsername).digest('base64');

    return Credential.create({
        userId: user.id,
        username: tempUsername,
        password: password,
        realm: realm,
        validity: validity,
        expiresOn: expiresOn
    });
}

function formatCredential(credential) {
    return {
        username: credential.username,
        password: credential.password,
        ttl: credential.validity,
        uris: [
            'turns:peanut.arnelle.me'
        ]
    };
}

module.exports = [
    get('/credentials', async ctx => {
        const { username, realm } = ctx.data;
        const user = await User.findOne({ where: { username } });
        if (!user) return status(403);

        const referer = new URL(ctx.headers.referer).host;
        const origins = await user.getOrigins({ where: { value: referer } });
        if (!origins.length) return status(403);

        const credentials = await user.getCredentials({
            where: {
                realm: realm,
                expiresOn: {
                    [Op.gt]: Date.now()
                }
            }
        });
        if (credentials.length > 0) {
            return json(formatCredential(credentials[0]));
        }
        const credential = await createCredential(user, username, realm);
        return json(formatCredential(credential));
    })
];
