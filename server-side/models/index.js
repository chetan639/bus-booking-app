const requireDirectory = require('require-directory');
const config = require('config');
const Sequelize = require('sequelize');
const dbConfig = config.get('dbConfig');
const hooks = require('../hooks');

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

function defineHooks(Models){
    console.log('Defining Hooks',hooks);
    for(let key in hooks){
        console.log(key);
        if(hooks[key]){
            hooks[key](Models);
        }
    }
}

function generateModels(modelsDirectory, sequelize){
    for(const key in modelsDirectory){
        Models[key] = modelsDirectory[key](sequelize);
    }
    associateTables(Models);
    defineHooks(Models);
    sequelize.sync()
}

generateModels(modelsDirectory, sequelize);

exports.Models = Models;
exports.sequelize = sequelize;