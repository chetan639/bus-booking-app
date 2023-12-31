const Joi = require('joi');
const controllers = require('../controllers');
const {getJourney,createJourney,updateJourney,deleteJourney} = controllers.journey

module.exports = [
    {
        method: 'GET',
        path: '/api/internal/journey/{journeyId}',
        config:{
            handler: getJourney
        }
    },
    {
        method: 'POST',
        path: '/api/internal/journey',
        config: {
            auth: {
                mode: 'try',
                strategy: 'session'
            },
            validate:{
                payload: Joi.object({
                    busId: Joi.number().integer().required(),
                    routeId: Joi.number().integer().required(),
                    departureTime: Joi.date().required(),
                    arrivalTime: Joi.date().required()
                })
            },
            handler: createJourney
        }
    },
    {
        method: 'PUT',
        path: '/api/internal/journey/{journeyId}',
        config:{
            auth:{
                mode: 'required',
                strategy: 'session'
            },
            validate:{
                payload: Joi.object({
                    busId: Joi.number().integer(),
                    routeId: Joi.number().integer(),
                    departureTime: Joi.date(),
                    arrivalTime: Joi.date()
                })
            },
            handler: updateJourney
        }
    },
    {
        method: 'DELETE',
        path: '/api/internal/journey/{journeyId}',
        config: {
            auth:{
                mode: 'required',
                strategy: 'session'
            },
            handler: deleteJourney
        }
    }
]
