const requireDirectory = require('require-directory');
const config = require('config');
const Sequelize = require('sequelize');
const dbConfig = config.get('dbConfig');

const modelsDirectory = requireDirectory(module);

const Models = {}
const sequelize = new Sequelize(dbConfig.dbName, dbConfig.userName, dbConfig.password, {
    dialect: dbConfig.dialect,
    host: dbConfig.host
});

function associateTables(Models){
    for(let key in Models){
        if('associate' in Models[key]){
            Models[key].associate(Models);
        }
    }
}

function generateModels(modelsDirectory, sequelize){
    for(const key in modelsDirectory){
        Models[key] = modelsDirectory[key](sequelize);
    }
    associateTables(Models);
    sequelize.sync()
}

generateModels(modelsDirectory, sequelize);

module.exports = { sequelize, Models }