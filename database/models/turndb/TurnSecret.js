module.exports = (database, DataTypes) => {
    return database.define('turn_secret', {
        realm: {
            type: DataTypes.STRING(127),
            primaryKey: true,
            defaultValue: ''
        },
        value: {
            type: DataTypes.STRING(256),
            primaryKey: true
        }
    }, {
        tableName: 'turn_secret',
        timestamps: false
    });
};
