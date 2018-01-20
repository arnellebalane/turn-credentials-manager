module.exports = (database, DataTypes) => {
    return database.define('credential', {
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
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        origin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        validity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        expiresOn: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });
};
