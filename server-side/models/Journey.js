const Sequelize = require('sequelize');

module.exports = (sequelize)=>{
    const Journey = sequelize.define('journey',{
        journeyId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        busId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        routeId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        departureTime:{
            type: Sequelize.DATE,
            allowNull: false
        },
        arrivalTime:{
            type: Sequelize.DATE,
            allowNull: false
        },
    },{
        paranoid: true
    });
    
    Journey.associate = models=>{
        Journey.belongsTo(models.Bus,{foreignKey: 'busId'});
        Journey.hasMany(models.Booking,{foreignKey: 'journeyId'});
        Journey.belongsTo(models.Route,{foreignKey: 'routeId'});
    }
    return Journey;
}