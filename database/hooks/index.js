const fs = require('fs');
const path = require('path');

const baseName = path.basename(__filename);

module.exports = (models) => {
    fs.readdirSync(__dirname).forEach(item => {
        if (item.startsWith('.') || !item.endsWith('.js') || item === baseName) return undefined;

        const name = path.basename(item, '.js');
        require('./' + name)(models);
    });
};
