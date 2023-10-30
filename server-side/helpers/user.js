const models = require('../models');

const getUser = async(userId)=>{
    try {
        const user = await models.Models.User.findOne({
            where:{
                userId: userId
            }
        });
        return user;
    } catch (error) {
        console.log(error);
        return;
    }
}

module.exports = getUser;