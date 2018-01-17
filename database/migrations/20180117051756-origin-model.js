exports.up = (database, Sequelize) => {
    return database.createTable('origins', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            },
            allowNull: false
        },
        value: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    });
};

exports.down = (database, Sequelize) => {
    return database.dropTable('origins');
};
