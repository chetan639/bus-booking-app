const elasticUtils = require('../utils/elastic.js');
const getSource = async(request,reply)=>{
    // const {source} = request.payload;

    const body = {
        "_source": ["route.source"]
    }
    try {
        const source = await elasticUtils.searchIndex('joined_data',body);

        if(!source){
            return reply("No source").code(401);
        }

        
        return reply(source).code(200);
    } catch (error) {
        console.log("Error in getting source",error);
        return reply("Internal server error").code(500);
    }
}

const getDestination = async(request,reply)=>{
    const body = {
        "_source": ["route.destination","route.inBetweenStops.stopName"]
    }

    try {
        const destination = await elasticUtils.searchIndex('joined_data',body);

        if(!destination){
            return reply("No source").code(401);
        }

        return reply(destination).code(200);
    } catch (error) {
        console.log("Error in getting destination",error);
        return reply("Internal server error").code(500);
    }
}

const getJourneyDetails = async(request,reply)=>{
    const {source,destination} = request.query;

    const body = {
        query: {
            bool: {
              must: [
                {
                  "match": {
                    "route.source": source
                  }
                },
                {
                  multi_match: {
                    "query": destination,
                    "fields": ["route.destination", "route.inBetweenStops.stopName"]
                  }
                }
              ]
            }
          }
    }
    try {
        const journeyDetails = await elasticUtils.searchIndex('joined_data',body);

        if(!journeyDetails){
            return reply("No source").code(401);
        }

        return reply(journeyDetails).code(200);
    } catch (error) {
        console.log("Error in getting journey details",error);
        return reply("Internal server error").code(500);
    }
}

module.exports = {
    getSource,
    getDestination,
    getJourneyDetails
}