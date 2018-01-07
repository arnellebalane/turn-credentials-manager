const Sequelize = require('sequelize');
const config = require('../config');
const dbConfig = require('../config/database');

const env = config.get('NODE_ENV');

const db = new Sequelize(dbConfig[env]);
const turndb = new Sequelize(dbConfig.turn);

module.export = db;
exports.turndb = turndb;
exports.Sequelize = Sequelize;
