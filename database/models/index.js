const { readdirSync } = require('fs');

const modelsPath = __dirname;
const models = readdirSync(modelsPath)
    .filter(model => model.endsWith('.js') && model !== 'index.js')
    .reduce((models, model) => {
        const modelFilename = model.replace(/\.js$/, '');
        const modelName = modelFilename.replace(/(^|\-)\w/g, match => match.replace('-', '').toUpperCase());
        models[modelName] = require('./' + modelFilename);
        return models;
    }, {});

module.exports = models;
