const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
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
        },
        sendEmailDate:{
            type: Sequelize.DATE
        }
    },{
        paranoid: true,
        hooks:{
            beforeCreate: async (user,options)=>{
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                const hash = await bcrypt.hash(user.password, salt);
                user.password = hash;
                user.salt = salt;
            }
        }
    });

    User.associate = models=>{
        User.hasMany(models.Booking,{foreignKey: 'userId'});
        User.hasOne(models.Operator,{foreignKey: 'userId'});
        User.hasMany(models.Rating,{foreignKey: 'userId'});
        User.hasMany(models.Session,{foreignKey: 'userId'});
    }
    
    return User;
}