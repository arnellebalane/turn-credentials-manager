exports.up = (database, Sequelize) => {
    return database.addColumn('credentials', 'secret', {
        type: Sequelize.STRING(256)
    });
};

exports.down = (database, Sequelize) => {
    return database.dropColumn('credentials', 'secret');
};
