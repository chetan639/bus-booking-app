const Joi = require('joi');
const controllers = require('../controllers');
const {getRoute,createRoute,updateRoute,deleteRoute} = controllers.route

module.exports = [
    {
        method: 'GET',
        path: '/api/internal/route/{routeId}',
        config:{
            handler: getRoute
        }
    },
    {
        method: 'POST',
        path: '/api/internal/route',
        config: {
            auth: {
                mode: 'try',
                strategy: 'session'
            },
            validate:{
                payload: Joi.object({
                    source: Joi.string().required(),
                    destination: Joi.string().required(),
                    inBetweenStops: Joi.array()
                })
            },
            handler: createRoute
        }
    },
    {
        method: 'PUT',
        path: '/api/internal/route/{routeId}',
        config:{
            auth:{
                mode: 'required',
                strategy: 'session'
            },
            validate:{
                payload: Joi.object({
                    source: Joi.string(),
                    destination: Joi.string(),
                    inBetweenStops: Joi.array().items(Joi.object())
                })
            },
            handler: updateRoute
        }
    },
    {
        method: 'DELETE',
        path: '/api/internal/route/{routeId}',
        config: {
            auth:{
                mode: 'required',
                strategy: 'session'
            },
            handler: deleteRoute
        }
    }
]
