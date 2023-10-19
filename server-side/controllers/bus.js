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
            return reply('Operator does not exist').code(401);
        }
        const buses = Models.Bus.findAll({
            where:{
                operatorId: operatorId
            }
        });

        if(!buses){
            return reply('No buses for this operator').code(401);
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
        const bus = await Models.Bus.findOne({
            where:{
                busId: busId
            }
        });

        if (!bus) {
            return reply('bus does not exist').code(401);
        }
        const updatedBuses = await Models.Bus.update(
            updatedDetails,
            {
                where: {
                    busId: busId
                }
            }
        );
        
        if(!updatedBuses){
            return reply('Error updating bus details').code(401);
        }
        
        return reply('Bus details updated successfully').code(200);
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
            return reply('Error deleting bus').code(401);
        }
        return reply('Bus details deleted').code(200);
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