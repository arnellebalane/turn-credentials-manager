const { Sequelize, turndb } = require('../index');

const TurnUser = turndb.define('turn_user', {
    realm: {
        type: Sequelize.STRING(127),
        primaryKey: true,
        allowNull: false,
        defaultValue: ''
    },
    user: {
        type: Sequelize.STRING(512),
        primaryKey: true,
        allowNull: false
    },
    hmackey: Sequelize.STRING(128)
}, {
    tableName: 'turnusers_lt'
});
