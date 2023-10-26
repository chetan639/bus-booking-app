const Joi = require('joi')
const controllers = require('../controllers');

module.exports = [
    {
        method: 'GET',
        path: '/api/internal/user/login',
        config: {
            handler: (req, res) => {
                return res({ message: 'Unauthorized access' })
            }
        },
    },
    {
        method: 'POST',
        path: '/api/internal/user/login',
        config: {
            auth: {
                mode: 'try',
                strategy: 'session'
            },
            plugins: {
                'hapi-auth-cookie': { redirectTo: false }
            },
            validate: {
                payload: {
                    emailId: Joi.string().email(),
                    password: Joi.string(),
                }
            },
            handler: controllers.user.userLogin
        },
    },
    {
        method: 'POST',
        path: '/api/internal/user/signup',
        config: {
            auth: false,
            validate: {
                payload: Joi.object({
                    userName: Joi.string(),
                    emailId: Joi.string().email(),
                    password: Joi.string(),
                    phoneNumber: Joi.string(),
                    firstName: Joi.string(),
                    lastName: Joi.string(),
                    address: Joi.string(),
                    paymentDetails: Joi.object(),
                    isOperator: Joi.boolean().default(false)
                })
            }
        },
        handler: controllers.user.userSignup
    },
    {
        method: 'POST',
        path: '/api/internal/user/logout',
        config: {
            auth: {
                mode: 'required',
                strategy: 'session'
            }
        },
        handler: controllers.user.userLogout
    },
    {
        method: 'GET',
        path: '/api/internal/user/{emailId}',
        config: {
            auth: {
                mode: 'required',
                strategy: 'session'
            },
            handler: controllers.user.getUser
        }
    },
    {
        method: 'PUT',
        path: '/api/internal/user',
        config:{
            auth: {
                mode: 'required',
                strategy: 'session'
            },
            validate: {
                payload: Joi.object({
                    userName: Joi.string(),
                    emailId: Joi.string().email(),
                    password: Joi.string(),
                    phoneNumber: Joi.string(),
                    firstName: Joi.string(),
                    lastName: Joi.string(),
                    address: Joi.string(),
                    paymentDetails: Joi.object(),
                    isOperator: Joi.boolean().default(false)
                })
            },
            handler: controllers.user.updateUser
        },
    },
    {
        method: "DELETE",
        path: '/api/internal/user/{emailId}',
        config:{
            auth:{
                mode: 'required',
                strategy: 'session'
            }
        },
        handler: controllers.user.deleteUser
    }

]