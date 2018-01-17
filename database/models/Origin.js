module.exports = (database, DataTypes) => {
    return database.define('origin', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            },
            allowNull: false
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};
