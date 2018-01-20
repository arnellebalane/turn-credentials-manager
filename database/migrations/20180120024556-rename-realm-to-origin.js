exports.up = (database, Sequelize) => {
    return database.renameColumn('credentials', 'realm', 'origin');
};

exports.down = (database, Sequelize) => {
    return database.renameColumn('credentials', 'origin', 'realm');
};
