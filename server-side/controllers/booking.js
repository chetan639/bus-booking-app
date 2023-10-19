const {Models} = require('../models');

const getUserBookings = async(request,reply)=>{
    const {userId} = request.params
    try {
        const user = await Models.User.findOne({
            where:{
                userId: userId
            }
        })
        if(!user){
            return reply('User does not exist').code(401);
        }
        const bookings = Models.Booking.findAll({
            where:{
                userId: userId
            }
        });

        if(!bookings){
            return reply('No bookings for this user').code(401);
        }

        return reply(bookings);
    } catch (error) {
        return reply('Internal server error').code(500);
    }
}

const createBooking = async (request,reply)=>{
    const bookingDetails = request.payload;

    try {
        const newBooking = await Models.Booking.create(bookingDetails);

        if(!newBooking){
            return reply('Error in booking!').code(401);
        }

        return reply('Booking Successful').code(201);
    } catch (error) {
        console.log(error);
        return reply('Internal Server Error').code(500);
    }
};

const updateBooking = async(request,reply)=>{
    const updatedDetails = request.payload;
    const {bookingId} = request.params;
    try {
        const booking = await Models.Booking.findOne({
            where:{
                bookingId: bookingId
            }
        });

        if (!booking) {
            return reply('booking does not exist').code(401);
        }
        const updatedBooking = await Models.Booking.update(
            updatedDetails,
            {
                where: {
                    bookingId: bookingId
                }
            }
        );
        
        if(!updatedBooking){
            return reply('Error updating booking').code(401);
        }
        
        return reply('Booking details updated successfully').code(200);
    } catch (error) {
        console.log(error);
        return reply('Internal Server Error').code(500);
    }
};

const deleteBooking = async(request,reply)=>{
    const {bookingId} = request.params;
    try {
        const booking = await Models.Booking.findOne({
            where:{
                bookingId: bookingId
            }
        });

        if (!booking) {
            return reply('booking does not exist').code(401);
        }
        
        const deletedBooking = await Models.Booking.destroy({
                where: bookingId
            }
        );
        
        if(!deletedBooking){
            return reply('Error deleting booking').code(401);
        }
        
        return reply('Booking details deleted').code(200);
    } catch (error) {
        console.log(error);
        return reply('Internal Server Error').code(500);
    }
}

module.exports = {
    getUserBookings,
    createBooking,
    updateBooking,
    deleteBooking
}