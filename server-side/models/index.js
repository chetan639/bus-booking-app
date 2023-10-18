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
    const {Booking,Bus,Journey,Operator,Rating,Route,Session,User} = Models;

    User.hasMany(Booking,{foreignKey: 'userId'});
    Booking.belongsTo(User,{foreignKey: 'userId'});

    Operator.hasMany(Bus,{foreignKey: 'operatorId'});
    Bus.belongsTo(Operator,{foreignKey: 'operatorId'});

    User.hasOne(Operator,{foreignKey: 'userId'});
    Operator.belongsTo(User,{foreignKey: 'userId'});

    Bus.hasMany(Journey,{foreignKey: 'busId'});
    Journey.belongsTo(Bus,{foreignKey: 'busId'});

    Bus.hasMany(Rating,{foreignKey: 'busId'});
    Rating.belongsTo(Bus,{foreignKey: 'busId'});

    User.hasMany(Rating,{foreignKey: 'userId'});
    Rating.belongsTo(User,{foreignKey: 'userId'});

    Journey.hasMany(Booking,{foreignKey: 'journeyId'});
    Booking.belongsTo(Journey,{foreignKey: 'journeyId'});

    Route.hasMany(Journey,{foreignKey: 'routeId'});
    Journey.belongsTo(Route,{foreignKey: 'routeId'});

    User.hasMany(Session,{foreignKey: 'userId'});
    Session.belongsTo(User,{foreignKey: 'userId'});
}

function generateModels(modelsDirectory, sequelize){
    for(const key in modelsDirectory){
        Models[key] = modelsDirectory[key](sequelize);
    }
    associateTables(Models);
    sequelize.sync()
}

generateModels(modelsDirectory, sequelize);

module.exports = { sequelize }