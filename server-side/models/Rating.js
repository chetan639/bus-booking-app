const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Rating = sequelize.define('rating',{
        ratingId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        busId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        rating: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    },{
        paranoid: true
    });
    
    return Rating;
}
