const {Models} = require('../models');

const getBus = async(request,reply)=>{
    const {busId} = request.params;

    try {
        const bus = await Models.Bus.findOne({
            where:{
                busId: busId
            }
        });

        if(!bus){
            return reply('Error in getting bus').code(401);
        }

        return reply(bus).code(200);
    } catch (error) {
        console.log(error);
        return reply('Internal server error').code(500);
    }
}
const getOperatorBuses = async(request,reply)=>{
    const {operatorId} = request.params
    try {
        const operator = await Models.Operator.findOne({
            where:{
                operatorId: operatorId
            }
        })
        if(!operator){
            return reply('User does not exist').code(401);
        }
        const buses = Models.Bus.findAll({
            where:{
                operatorId: operatorId
            }
        });

        if(!buses){
            return reply('No bookings for this user').code(401);
        }

        return reply(buses);
    } catch (error) {
        console.log(error);
        return reply('Internal server error').code(500);
    }
}

const createBus = async (request,reply)=>{
    const busDetails = request.payload;

    try {
        const newBus = await Models.Bus.create(busDetails);

        if(!newBus){
            return reply('Error in creating bus!').code(401);
        }

        return reply('Created Bus Successfully').code(201);
    } catch (error) {
        console.log(error);
        return reply('Internal Server Error').code(500);
    }
};

const updateBus = async(request,reply)=>{
    const updatedDetails = request.payload;
    const {busId} = request.params;
    try {
        const updatedBooking = await Models.Booking.update(
            updatedDetails,
            {
                where: {
                    busId: busId
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

const deleteBus = async(request,reply)=>{
    const {busId} = request.params;
    try {
        const deletedBus = await Models.Bus.destroy({
                where: {
                    busId: busId
                }
            }
        );
        
        if(!deletedBus){
            return reply('Error deleting booking').code(401);
        }
        return reply('Booking details deleted').code(200);
    } catch (error) {
        console.log(error);
        return reply('Internal Server Error').code(500);
    }
}

module.exports = {
    getBus,
    getOperatorBuses,
    createBus,
    updateBus,
    deleteBus
}