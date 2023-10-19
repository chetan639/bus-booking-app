const Joi = require('joi')
const controllers = require('../controllers');

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
            handler: controllers.user.userLogin
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
        handler: controllers.user.userSignup
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
        handler: controllers.user.userLogout
    },
    {
        method: 'PUT',
        path: '/user/update/{userId}',
        config:{
            auth: {
                mode: 'required',
                strategy: 'session'
            }
        },
        handler: controllers.user.updateUser
    },
    {
        method: "DELETE",
        path: '/user/delete/{userId}',
        config:{
            auth:{
                mode: 'required',
                strategy: 'session'
            }
        },
        handler: controllers.user.deleteUser
    }

]