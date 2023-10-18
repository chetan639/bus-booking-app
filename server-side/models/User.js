const Sequelize = require('sequelize');

module.exports = (sequelize)=>{
    const User = sequelize.define('user',{
        userId:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userName:{
            type: Sequelize.STRING,
            unique: true
        },
        emailId:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail(value){
                    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
                    if(!emailRegex.test(value)){
                        throw new Error('This value should be an email');
                    }
                }
            }
        },
        password:{
            type: Sequelize.STRING,
            allowNull: false
        },
        phoneNumber:{
            type: Sequelize.STRING,
            allowNull: false
        },
        firstName:{
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName:{
            type: Sequelize.STRING,
            allowNull: false
        },
        address:{
            type: Sequelize.STRING,
            allowNull: false
        },
        paymentDetails:{
            type: Sequelize.JSONB
        },
        isOperator:{
            type: Sequelize.BOOLEAN
        }
    },{
        paranoid: true
    });
    
    return User;
}