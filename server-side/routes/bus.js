const Joi = require('joi');
const controllers = require('../controllers');
const {getBus,createBus,updateBus,deleteBus,getBusDetails} = controllers.bus

module.exports = [
    {
        method: 'GET',
        path: '/api/internal/bus/{busId}',
        config:{
            handler: getBus
        }
    },
    {
        method: 'GET',
        path: '/api/internal/bus/details/{busId}',
        config: {
            handler: getBusDetails
        }
    },
    {
        method: 'POST',
        path: '/api/internal/bus',
        config: {
            auth: {
                mode: 'try',
                strategy: 'session'
            },
            validate:{
                payload: Joi.object({
                    operatorId: Joi.number().integer().required(),
                    busNumber: Joi.number().required(),
                    busType: Joi.string().valid('Seater','Sleeper','Semi Sleeper').required(),
                    seatingCapacity: Joi.number().integer().max(50).min(10).required(),
                    busAmenities: Joi.object().required(),
                    rating: Joi.number().integer().max(5),
                    isAC: Joi.boolean().required()
                })
            },
            handler: createBus
        }
    },
    {
        method: 'PUT',
        path: '/api/internal/bus/{busId}',
        config:{
            auth:{
                mode: 'required',
                strategy: 'session'
            },
            validate:{
                payload: Joi.object({
                    operatorId: Joi.number().integer(),
                    busNumber: Joi.string().alphanum(),
                    busType: Joi.string().valid('Seater','Sleeper','Semi Sleeper'),
                    seatingCapacity: Joi.number().integer(),
                    busAmenities: Joi.object(),
                    rating: Joi.number().integer().max(5),
                    isAC: Joi.boolean()
                })
            },
            handler: updateBus
        }
    },
    {
        method: 'DELETE',
        path: '/api/internal/bus/{busId}',
        config: {
            auth:{
                mode: 'required',
                strategy: 'session'
            },
            handler: deleteBus
        }
    }
]
