exports.up = (database, Sequelize) => {
    return database.createTable('credentials', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            },
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        realm: {
            type: Sequelize.STRING,
            allowNull: false
        },
        validity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        expiresOn: {
            type: Sequelize.DATE,
            allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    });
};

exports.down = (database, Sequelize) => {
    return database.dropTable('credentials');
};
