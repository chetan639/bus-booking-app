const Joi = require('joi');
const controllers = require('../controllers');
const {getBooking,createBooking,updateBooking,deleteBooking} = controllers.booking

module.exports = [
    {
        method: 'GET',
        path: '/api/internal/booking/{bookingId}',
        config:{
            handler: getBooking
        }
    },
    {
        method: 'POST',
        path: '/api/internal/booking',
        config: {
            auth: {
                mode: 'try',
                strategy: 'session'
            },
            validate:{
                payload: Joi.object({
                    journeyId: Joi.number().integer().required(),
                    userId: Joi.number().integer().required(),
                    seatNumber: Joi.number().integer().required(),
                    fare: Joi.number().required(),
                    bookingTime: Joi.date().required(),
                    source: Joi.string().required(),
                    destination: Joi.string().required()
                })
            },
            handler: createBooking
        }
    },
    {
        method: 'PUT',
        path: '/api/internal/booking/{bookingId}',
        config:{
            auth:{
                mode: 'required',
                strategy: 'session'
            },
            validate:{
                payload: Joi.object({
                    journeyId: Joi.number().integer(),
                    userId: Joi.number().integer(),
                    seatNumber: Joi.number().integer(),
                    fare: Joi.number(),
                    bookingTime: Joi.date(),
                    source: Joi.string(),
                    destination: Joi.string()
                })
            },
            handler: updateBooking
        }
    },
    {
        method: 'DELETE',
        path: '/api/internal/booking/{bookingId}',
        config: {
            auth:{
                mode: 'required',
                strategy: 'session'
            },
            handler: deleteBooking
        }
    }
]
