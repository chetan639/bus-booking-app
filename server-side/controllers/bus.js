const { Models } = require('../models');
const {getOrSetToRedis, clearRedis} = require('../utils/redis.js');

const getBus = async (request, reply) => {
    const { busId } = request.params;
    try {
        const bus = await getOrSetToRedis(`bus:${busId}`, Models.Bus, async (Bus) => {
            try {
                const bus = await Bus.findOne({
                    where: {
                        busId: busId
                    }
                });
                return bus;
            } catch (error) {
                console.log(error);
                return;   
            }
        });

        if (!bus) {
            return reply('Error in getting bus').code(401);
        }
        return reply(bus).code(200);
    } catch (error) {
        console.log(error);
        return reply('Internal server error').code(500);
    }
}

const getBusDetails = async(request,reply)=>{
    const {busId} = request.params;

    try {
        const bus = await getOrSetToRedis(`bus:${busId}`, Models.Bus, async (Bus) => {
            try {
                const bus = await Bus.findOne({
                    where: {
                        busId: busId
                    },
                    include:[{
                        model: Models.Operator,
                        required: true
                    }]
                })
                return bus;
            } catch (error) {
                console.log(error);
                return;   
            }
        });

        if(!bus){
            return reply('No such bus!').code(401);
        }

        return reply(bus).code(200);
    } catch (error) {
        console.log(error);
        return reply('Internal server error').code(500);
    }
}

const createBus = async (request, reply) => {
    const busDetails = request.payload;

    try {
        const newBus = await Models.Bus.create(busDetails);

        if (!newBus) {
            return reply('Error in creating bus!').code(401);
        }

        return reply('Created Bus Successfully').code(201);
    } catch (error) {
        console.log(error);
        return reply('Internal Server Error').code(500);
    }
};

const updateBus = async (request, reply) => {
    const updatedDetails = request.payload;
    const { busId } = request.params;
    try {
        const bus = await getOrSetToRedis(`bus:${busId}`, Models.Bus, async (Bus) => {
            try {
                const bus = await Bus.findOne({
                    where: {
                        busId: busId
                    }
                });
                return bus;
            } catch (error) {
                console.log(error);
                return;   
            }
        });

        if (!bus) {
            return reply('bus does not exist').code(401);
        }
        clearRedis(`bus:${busId}`,Models.Bus);
        const updatedBuses = await Models.Bus.update(
            updatedDetails,
            {
                where: {
                    busId: busId
                }
            }
        );

        if (!updatedBuses) {
            return reply('Error updating bus details').code(401);
        }
        return reply('Bus details updated successfully').code(200);
    } catch (error) {
        console.log(error);
        return reply('Internal Server Error').code(500);
    }
};

const deleteBus = async (request, reply) => {
    const { busId } = request.params;
    try {
        const bus = await getOrSetToRedis(`bus:${busId}`, Models.Bus, async (Bus) => {
            try {
                const bus = await Bus.findOne({
                    where: {
                        busId: busId
                    }
                });
                return bus;
            } catch (error) {
                console.log(error);
                return;   
            }
        });

        if(!bus){
            return reply('No such bus').code(401);
        }

        clearRedis(`bus:${busId}`,Models.Bus);

        const deletedBus = await Models.Bus.destroy({
            where: {
                busId: busId
            }
        }
        );

        if (!deletedBus) {
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
    getBusDetails,
    createBus,
    updateBus,
    deleteBus
}