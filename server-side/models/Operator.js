const Sequelize = require('sequelize');

module.exports = (sequelize)=>{
    const Operator = sequelize.define('operator',{
        operatorId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        operatorName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        operatorContact: {
            type: Sequelize.STRING,
            allowNull: false
        },
        rating: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        userId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
    },{
        paranoid: true
    });
    
    return Operator;
}
