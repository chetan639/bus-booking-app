const Sequelize = require('sequelize');

module.exports = (sequelize)=>{
    const Session = sequelize.define('session',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        sessionId: {
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
    
    Session.associate = models=>{
        Session.belongsTo(models.User,{foreignKey: 'userId'});
    }
    return Session;
}


