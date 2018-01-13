exports.up = (database, Sequelize) => {
    return database.renameColumn('credentials', 'user_id', 'userId');
};

exports.down = (database, Sequelize) => {
    return database.renameColumn('credentials', 'userId', 'user_id');
};
