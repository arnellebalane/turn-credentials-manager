const { Op } = require('sequelize');
const { Credential } = require('../database/models');

module.exports = (agenda) => {
    agenda.define('delete-expired-credentials', async (job, done) => {
        await Credential.destroy({
            where: {
                expiresOn: {
                    [Op.lt]: Date.now()
                }
            },
            individualHooks: true
        });
        done();
    });

    agenda.every('30 minutes', 'delete-expired-credentials');
};
