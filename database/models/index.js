const fs = require('fs');
const path = require('path');
const databases = require('../index');

const baseName = path.basename(__filename);

function isModelFile(itemPath, itemName) {
    const stats = fs.lstatSync(path.join(itemPath, itemName));
    return stats.isFile() && itemName !== baseName;
}

function isModelDirectory(itemPath, itemName) {
    const stats = fs.lstatSync(path.join(itemPath, itemName));
    return stats.isDirectory();
}

function importModelsInDirectory(directory, database) {
    return fs.readdirSync(directory).reduce((models, item) => {
        const itemBaseName = path.basename(item, '.js');
        if (isModelFile(directory, item)) {
            models[itemBaseName] = database.import(path.join(directory, item));
        } else if (isModelDirectory(directory, item) && itemBaseName in databases) {
            models = Object.assign(
                models,
                importModelsInDirectory(path.join(directory, item), databases[itemBaseName])
            );
        }
        return models;
    }, {});
}

const models = importModelsInDirectory(__dirname, databases.defaultdb);

// Set model associations. This would be better if defined in the
// model definitions directly.
models.User.hasMany(models.Credential);
models.Credential.belongsTo(models.User);

// Load Sequelize model hooks.
require('../hooks')(models);

module.exports = models;
