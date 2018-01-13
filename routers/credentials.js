const { get } = require('server/router');
const { status, json } = require('server/reply');
const { Op } = require('sequelize');
const pick = require('lodash/pick');
const addSeconds = require('date-fns/add_seconds');
const crypto = require('crypto');
const { Credential, User } = require('../database/models');
const config = require('../config');

async function createCredential(user, username, realm) {
    const validity = config.get('CREDENTIAL_VALIDITY');
    const turnSecretKey = config.get('TURN_SECRET_KEY');
    const hmac = crypto.createHmac('sha1', turnSecretKey);

    const expiresOn = addSeconds(Date.now(), validity)
    const timestamp = Math.floor(expiresOn.getTime() / 1000);
    const tempUsername = timestamp + ':' + username;
    const password = hmac.update(tempUsername).digest('base64');

    return await Credential.create({
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

        const credentials = await user.getCredentials({
            where: {
                realm: realm,
                expiresOn: {
                    [Op.gt]: Date.now()
                }
            }
        });
        if (credentials.length > 0) {
            return json(formatCredential(credentials[0].get()));
        }
        return json(formatCredential(await createCredential(user, username, realm)));
    })
];
