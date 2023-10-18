const userControllers = require('../controllers/user.js')

module.exports = [
    {
        method: 'GET',
        path: '/user/{userId}',
        handler: userControllers.getUser
    }
]