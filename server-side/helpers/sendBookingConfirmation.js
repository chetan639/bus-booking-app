const getUser = require('./user.js');
const nodemailer = require('nodemailer');
const models = require('../models');
const Sequelize = require('sequelize');

const transporter = nodemailer.createTransport({
    port: 1025
});

const sendBookingConfirmation = async(booking)=>{
    const {bookingId,userId,seatNumber,source,destination} = booking;
    // console.log(Models);
    try {
        const user = await getUser(userId);
        
        if(!user){
            console.log('No such user');;
            throw new Error('No such user');
        }
        
        const emailId = user.emailId;
        // const emailId = 'a@b.com'
        
        const messageStatus = await transporter.sendMail({
            from: 'Book Bus <tickets@bookbus.com>',
            to: emailId,
            subject: `Booking Details for bookingId:${bookingId}`,
            text: `Your Booking for bus from ${source} to ${destination} has been confirmed
            Your seat number: ${seatNumber}
            `
        });
        
        if(!messageStatus){
            console.log("Email could not be sent");
            return;
        }
        console.log('Email sent!');
    } catch (error) {
        console.log(error);
        throw new Error('Internal server error while sending the email.');
    }
}

const sendEmails = async()=>{
    // const {userId} = userDetails;
    try {
        const users = await models.Models.User.findAll();


        const route = await models.Models.Route.findAll({ order: ['routeId','DESC'], limit: 1 });

        users.forEach(async (user)=>{
            const emailId = user.emailId;

            const {source,destination} = route;

            const messageStatus = await transporter.sendMail({
                from: 'Book Bus <marketing@bookbus.com>',
                to: emailId,
                subject: `Our buses now run from ${source} to ${destination}`,
                text: `Planning to travel from ${source} to ${destination}? We have buses running in these routes, book now!`
            });

            if(!messageStatus){
                console.log("Email could not be sent");
                return;
            }
            user.sendEmailDate = new Date().toISOString();//Will return date in the format: '2023-10-30T10:51:07.387Z'
            console.log(`Email sent to ${user.userName}`);
        })
    } catch (error) {
        console.log('There was an error in sending the email',error);
        return;
    }
}

module.exports = {sendBookingConfirmation, sendEmails};