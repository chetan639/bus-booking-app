const Sequelize = require('sequelize');

module.exports = (sequelize)=>{
    const Route = sequelize.define('route',{
        routeId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        source: {
            type: Sequelize.STRING,
            allowNull: false
        },
        destination: {
            type: Sequelize.STRING,
            allowNull: false
        },
        inBetweenStops:{
            type: Sequelize.JSONB
        }
    },{
        paranoid: true
    });
    
    return Route;
}