exports.up = (database, Sequelize) => {
    return database.createTable('users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    });
};

exports.down = (database, Sequelize) => {
    return database.dropTable('users');
};
