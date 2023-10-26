const {Models} = require('../models');
const bcrypt = require('bcrypt');
const {getOrSetToRedis,clearRedis} = require('../utils/redis.js');

const userLogin = async(request,reply)=>{
    const {emailId,password} = request.payload;

    try {
        if(request.auth.isAuthenticated){
            return reply.redirect('/');
        }

        const user = await getOrSetToRedis(`user:${emailId}`,Models.User,async (User)=>{
            return await User.findOne({
                where:{
                    emailId: emailId
                }
            });
        })
        

        if(!user){
            return reply({message: 'Authentication Failed, Invalid credentials 1'}).code(401);
        }

        const passwordMatch = await bcrypt.compare(password,user.password);

        if(!passwordMatch){
            return reply({message: 'Authentication Failed, Invalid credentials 2'}).code(401);
        }

        const sid = parseInt(Date.now()/10000);
        // const sid = 1;
        const newSession = await Models.Session.create({
            sessionId: sid,
            isActive: true,
            userId: user.userId
        });

        await request.cookieAuth.set({id: sid, userId: user.userId, emailId: user.emailId});
        return reply({message:'User has been logged in!'}).code(200);
    } catch (error) {
        console.log(error);
        return reply({message: 'Internal server error'},error).code(500);
    }
};

const userSignup = async(request,reply)=>{
    const userDetails = request.payload;
    try {
        const newUser = await Models.User.create(userDetails);

        if(!newUser){
            return reply({message: 'User could not be created'}).code(401);
        }
        return reply({message: 'New user has been successfully created'}).code(201);
    } catch (error) {
        console.log(error);
        return reply('Internal server error',error).code(500);
    }
};

const userLogout = async (request,reply)=>{
    try {
        if(!request.cookieAuth){
            return reply({message: 'No user has logged in'}).code(400);
        }


        const updateSession = await Models.Session.update(
            {isActive: false},
            {
                where:{
                    sessionId: request.auth.artifacts.id
                }
            }
        )

        if(!updateSession){
            return reply('Error logging out').code(401);
        }
        clearRedis(`user:${request.auth.artifacts.emailId}`,Models.User);
        request.cookieAuth.clear();
        return reply({message: 'User was logged out'});
    } catch (error) {
        console.log(error);
        return reply({message: 'Internal server error'}).code(500);
    }
}

const getUser = async(request,reply)=>{
    const {emailId} = request.params;

    try {
        const user = await getOrSetToRedis(`user:${emailId}`,Models.User,async (User)=>{
            return await User.findOne({
                where:{
                    emailId: emailId
                }
            });
        });

        if(!user){
            return reply('User does not exist').code(401);
        }

        return reply(user).code(200);
    } catch (error) {
        console.log(error);
        return reply('Internal server error').code(500);
    }
}

const updateUser = async(request,reply)=>{
    const updatedDetails = request.payload;
    const emailId = request.auth.artifacts.emailId;
    // const {userId} = request.params;
    try {
        const user = await getOrSetToRedis(`user:${emailId}`,Models.User,async (User)=>{
            return await User.findOne({
                where:{
                    emailId: emailId
                }
            });
        });

        if (!user) {
            return reply('user does not exist').code(401);
        }
        const updatedUsers = await Models.User.update(
            updatedDetails,
            {
                where: {
                    emailId: emailId
                }
            }
        );
        
        if(!updatedUsers){
            return reply('Error updating user details').code(401);
        }
        
        clearRedis(`user:${user.emailId}`,Models.User);
        return reply('user details updated successfully').code(200);
    } catch (error) {
        console.log(error);
        return reply('Internal Server Error').code(500);
    }
};

const deleteUser = async(request,reply)=>{
    const {emailId} = request.params;
    // const emailId = request.auth.artifacts.emailId;
    try {
        const user = await getOrSetToRedis(`user:${emailId}`,Models.User,async (User)=>{
            return await User.findOne({
                where:{
                    emailId: emailId
                }
            });
        });

        if(!user){
            return reply('No such user').code(401);
        }
        const deletedUser = await Models.User.destroy({
                where: {
                    emailId: emailId
                }
            }
        );
        
        if(!deletedUser){
            return reply('Error deleting user').code(401);
        }

        clearRedis(`user:${user.emailId}`,Models.User);
        return reply('User details deleted').code(200);
    } catch (error) {
        console.log(error);
        return reply('Internal Server Error').code(500);
    }
}

module.exports = {
    userLogin,
    userSignup,
    userLogout,
    getUser,
    updateUser,
    deleteUser
}