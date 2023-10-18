const Sequelize = require('sequelize');

module.exports = (sequelize)=>{
    const Session = sequelize.define('session',{
        sessionId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        sessionName: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        isActive:{
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    },{
        paranoid: true
    });
    
    return Session;
}


