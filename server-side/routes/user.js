const Joi = require('joi')
const userControllers = require('../controllers/user.js')

module.exports = [
    {
        method: 'GET',
        path: '/user/login',
        config: {
            handler: (req, res) => {
                return res({ message: 'hi' })
            }
        },
    },
    {
        method: 'POST',
        path: '/user/login',
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
            handler: userControllers.userLogin
        },
    },
    {
        method: 'POST',
        path: '/user/signup',
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
                    isOperator: Joi.boolean()
                })
            }
        },
        handler: userControllers.userSignup
    },
    {
        method: 'POST',
        path: '/user/logout',
        config: {
            auth: {
                mode: 'required',
                strategy: 'session'
            }
        },
        handler: userControllers.userLogout
    }

]