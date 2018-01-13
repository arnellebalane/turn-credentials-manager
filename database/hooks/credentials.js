const { Op } = require('sequelize');

function createTurnUser({ Credential, TurnUser }) {
    Credential.afterCreate('createTurnUser', async (credential, options) => {
        const user = await credential.getUser();
        const turnUserData = {
            name: user.username,
            realm: credential.realm
        };
        const turnUser = await TurnUser.findOne({ where: turnUserData });
        if (!turnUser) {
            await TurnUser.create(turnUserData);
        }
    });
}

function deleteTurnUserAndTurnSecret({ Credential, TurnUser, TurnSecret }) {
    Credential.afterDestroy('deleteTurnUserAndTurnSecret', async (credential, options) => {
        const user = await credential.getUser();
        const credentials = await user.getCredentials({
            where: {
                expiresOn: {
                    [Op.gt]: Date.now()
                }
            }
        });
        if (credentials.length > 0) return undefined;

        await Promise.all([
            TurnUser.destroy({
                where: { name: user.username }
            }),
            TurnSecret.destroy({
                where: { realm: credential.realm }
            })
        ]);
    });
}

module.exports = (models) => {
    createTurnUser(models);
    deleteTurnUserAndTurnSecret(models);
};