function createTurnUser({ Credential, TurnUser }) {
    Credential.afterCreate('createTurnUser', async (credential, options) => {
        const user = await credential.getUser();
        const turnUserData = {
            name: user.username,
            realm: credential.realm
        };
        const turnUser = await TurnUser.findOne({ where: turnUserData });
        if (!turnUser) {
            TurnUser.create(turnUserData);
        }
    });
}

module.exports = (models) => {
    createTurnUser(models);
};
