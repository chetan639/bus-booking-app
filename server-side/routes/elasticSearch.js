const controllers = require('../controllers');
const {getSource,getDestination,getJourneyDetails} = controllers.elasticSearch;

module.exports = [
    {
        method: 'GET',
        path: '/api/internal/journeyDetails/source',
        config:{
            handler: getSource
        }
    },
    {
        method: 'GET',
        path: '/api/internal/journeyDetails/destination',
        config:{
            handler: getDestination
        }
    },
    {
        method: 'GET',
        path: '/api/internal/journeyDetails',
        config:{
            handler: getJourneyDetails
        }
    },
]