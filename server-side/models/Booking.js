const Sequelize = require('sequelize');

module.exports = (sequelize)=>{
    const Booking = sequelize.define('booking',{
        bookingId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        journeyId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        userId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        seatNumber:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fare:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        bookingTime:{
            type: Sequelize.DATE,
            allowNull: false
        },
        source:{
            type: Sequelize.STRING,
            allowNull: false
        },
        destination:{
            type: Sequelize.STRING,
            allowNull: false
        }
    },{
        paranoid: true
    });

    Booking.associate = models => {
        Booking.belongsTo(models.User,{foreignKey: 'userId'});
        Booking.belongsTo(models.Journey,{foreignKey: 'journeyId'});
    }
    return Booking;
}

