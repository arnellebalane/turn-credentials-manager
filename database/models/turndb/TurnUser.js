module.exports = (database, DataTypes) => {
    return database.define('turn_user', {
        realm: {
            type: DataTypes.STRING(127),
            primaryKey: true,
            allowNull: false,
            defaultValue: ''
        },
        user: {
            type: DataTypes.STRING(512),
            primaryKey: true,
            allowNull: false
        },
        hmackey: DataTypes.STRING(128)
    }, {
        tableName: 'turnusers_lt',
        timestamps: false
    });
};
