module.exports = (database, DataTypes) => {
    return database.define('turn_user', {
        realm: {
            type: DataTypes.STRING(127),
            primaryKey: true,
            defaultValue: ''
        },
        name: {
            type: DataTypes.STRING(512),
            primaryKey: true
        },
        hmackey: DataTypes.STRING(128)
    }, {
        tableName: 'turnusers_lt',
        timestamps: false
    });
};
