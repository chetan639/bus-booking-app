const Sequelize = require('sequelize');
const { seater, semiSleeper, sleeper } = require('../commonConstants/modelConstants.js');

module.exports = (sequelize) => {
    const Bus = sequelize.define('bus', {
        busId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        operatorId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        busNumber: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
        },
        busType: {
            type: Sequelize.ENUM(seater, semiSleeper, sleeper),
            allowNull: false
        },
        seatingCapacity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            min: 1,
            max: 50
        },
        busAmenities: {
            type: Sequelize.JSONB,
            allowNull: false
        },
        rating: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            max: 5,
            min: 0
        },
        isAC: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    }, {
        paranoid: true
    });

    Bus.associate = models => {
        Bus.hasMany(models.Journey, { foreignKey: 'busId' });
        Bus.hasMany(models.Rating, { foreignKey: 'busId' });
        Bus.belongsTo(models.Operator,{foreignKey: 'operatorId'}); 
    }
    
    return Bus;
}