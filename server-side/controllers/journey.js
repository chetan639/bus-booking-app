const {Models} = require('../models');
const {getOrSetToRedis,clearRedis} = require('../utils/redis.js');

const getJourney = async(request,reply)=>{
    const {journeyId} = request.params;

    try {
        const journey = await getOrSetToRedis(`journey:${journeyId}`,Models.Journey,async (Journey)=>{
            const journey = await Models.Journey.findOne({
                where:{
                    journeyId: journeyId
                },
                include:[{
                    model: Models.Route,
                    required: true
                },{
                    model: Models.Bus,
                    required: true
                }]
            });
            if(!journey){
                return;
            }
            return journey;
        })

        if(!journey){
            return reply('Error in getting journey').code(401);
        }

        return reply(journey).code(200);
    } catch (error) {
        console.log(error);
        return reply('Internal server error').code(500);
    }
}
// const getBusJourneys = async(request,reply)=>{
//     const {busId} = request.params
//     try {
//         const bus = await Models.Bus.findOne({
//             where:{
//                 busId: busId
//             }
//         })
//         if(!bus){
//             return reply('Bus does not exist').code(401);
//         }
//         const journeys = Models.Journey.findAll({
//             where:{
//                 busId: busId
//             }
//         });

//         if(!journeys){
//             return reply('No journeys for this bus').code(401);
//         }

//         return reply(journeys);
//     } catch (error) {
//         console.log(error);
//         return reply('Internal server error').code(500);
//     }
// }
const getJourneyBySearch = async(request,reply)=>{
      
}

const createJourney = async (request,reply)=>{
    const journeyDetails = request.payload;

    try {
        const newJourney = await Models.Journey.create(journeyDetails);

        if(!newJourney){
            return reply('Error in creating journey!').code(401);
        }

        return reply('Created Journey Successfully').code(201);
    } catch (error) {
        console.log(error);
        return reply('Internal Server Error').code(500);
    }
};

const updateJourney = async(request,reply)=>{
    const updatedDetails = request.payload;
    const {journeyId} = request.params;
    try {
        const journey = await Models.Journey.findOne({
            where:{
                journeyId: journeyId
            }
        });

        if (!journey) {
            return reply('journey does not exist').code(401);
        }
        const updatedJourney = await Models.Journey.update(
            updatedDetails,
            {
                where: {
                    journeyId: journeyId
                }
            }
        );
        
        if(!updatedJourney){
            return reply('Error updating journey').code(401);
        }
        return reply('journey details updated successfully').code(200);
    } catch (error) {
        console.log(error);
        return reply('Internal Server Error').code(500);
    }
};

const deleteJourney = async(request,reply)=>{
    const {journeyId} = request.params;
    try {
        const journey = await Models.Journey.findOne({
            where:{
                journeyId: journeyId
            }
        });

        if (!journey) {
            return reply('journey does not exist').code(401);
        }
        const deletedJourney = await Models.Journey.destroy({
                where: {
                    journeyId: journeyId
                }
            }
        );
        if(!deletedJourney){
            return reply('Error deleting journey').code(401);
        }
        return reply('journey details deleted').code(200);
    } catch (error) {
        console.log(error);
        return reply('Internal Server Error').code(500);
    }
}

module.exports = {
    getJourney,
    // getBusJourneys,
    createJourney,
    updateJourney,
    deleteJourney
}