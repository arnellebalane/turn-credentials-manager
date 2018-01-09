const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');
const config = require('../config');

const env = config.get('NODE_ENV');
const defaultdb = new Sequelize(databaseConfig[env]);
const turndb = new Sequelize(config.get('TURN_DATABASE_URL'));

module.exports = { defaultdb, turndb };
