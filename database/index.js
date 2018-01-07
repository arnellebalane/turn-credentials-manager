const Sequelize = require('sequelize');
const config = require('../config');

const db = new Sequelize(config.get('DATABASE_URL'));
const turndb = new Sequelize(config.get('TURN_DATABASE_URL'));

module.exports = db;
exports.turndb = turndb;
exports.Sequelize = Sequelize;
