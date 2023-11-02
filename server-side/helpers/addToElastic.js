const models = require('../models');
const elasticUtils = require('../utils/elastic.js');

// const {Journey,Bus,Route} = models.Models;
const addJourneyToElastic = async(journey)=>{
    console.log("Add Journey to elastic",journey);
    try {
        const joinedData = await models.Models.Journey.findOne({
            where: {
                journeyId: journey.journeyId
            },
            include: [
                {
                    model: models.Models.Bus,
                    required: true
                },
                {
                    model: models.Models.Route,
                    required: true
                }
            ]
        });
        
        if(!joinedData){
            console.log('No data present');
            return;
        }

        await elasticUtils.addDocument('joined_data','_doc',joinedData);

        console.log("added to elastic!!");
    } catch (error) {
        console.log('Error adding/joining data',error);
        return;
    }   
};

module.exports = {addJourneyToElastic};