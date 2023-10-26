const Joi = require('joi');
const controllers = require('../controllers');
const {getOperator,createOperator,updateOperator,deleteOperator} = controllers.operator

module.exports = [
    {
        method: 'GET',
        path: '/api/internal/operator/{operatorId}',
        config:{
            handler: getOperator
        }
    },
    {
        method: 'POST',
        path: '/api/internal/operator',
        config: {
            auth: {
                mode: 'try',
                strategy: 'session'
            },
            validate:{
                payload: Joi.object({
                    operatorName: Joi.string().required(),
                    operatorContact: Joi.string().alphanum().required(),
                    rating: Joi.number().integer().max(5).required(),
                    userId: Joi.number().integer().required()
                })
            },
            handler: createOperator
        }
    },
    {
        method: 'PUT',
        path: '/api/internal/operator/{operatorId}',
        config:{
            auth:{
                mode: 'required',
                strategy: 'session'
            },
            validate:{
                payload: Joi.object({
                    operatorName: Joi.string(),
                    operatorContact: Joi.string().alphanum(),
                    rating: Joi.number().integer().max(5),
                    userId: Joi.number().integer()
                })
            },
            handler: updateOperator
        }
    },
    {
        method: 'DELETE',
        path: '/api/internal/operator/{operatorId}',
        config: {
            auth:{
                mode: 'required',
                strategy: 'session'
            },
            handler: deleteOperator
        }
    }
]
