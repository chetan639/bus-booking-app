const Hapi = require('hapi');
const Joi = require('joi');
const config = require('config');
const serverConfig = config.get('server');
const AuthCookie = require('hapi-auth-cookie');
const { Models } = require('./models');
const { booking, bus, journey, operator, route, user } = require('./routes');
const emailQueue = require('./workers/email.js');


const { sequelize } = require('./models/index.js');


const startServer = async () => {

    const server = new Hapi.Server();
    server.connection({
        host: serverConfig.host,
        port: serverConfig.PORT,
    })

    await server.start((error, value) => {
        if (error) console.log('err', error)
    });
    console.log(`Server running`);

    await server.register(AuthCookie);

    server.auth.strategy('session', 'cookie', {
        cookie: 'restriction',
        password: 'jsh7h98h9a8bf0a8usbdbf90s8bf98sdvnbpisujdhfgpa98', // Change this to a secret key
        isSecure: false, // In production, set this to true for HTTPS
        redirectTo: '/api/internal/user/login', // Redirect to the login page if not authenticated,

        validateFunc: async (request, session, callback) => {
            try {
                if (!session) {
                    return callback(null, false);
                }

                const user = await Models.Session.findOne({
                    where: {
                        sessionId: session.id
                    }
                })

                if (!user) {
                    return callback(null, false);
                }

                return callback(null, true, user);
            } catch (error) {
                console.log("Validation error:", error);
                return callback(error, false);
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        config: {
            auth:
            {
                mode: 'try',
                strategy: 'session'
            },
            handler: (request, response) => {
                return response({ message: "Hello World" });
            }
        },
    });

    server.route(user);
    server.route(bus);
    server.route(operator);
    server.route(journey);
    server.route(booking);
    server.route(route);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

const startDB = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully');
    } catch (error) {
        console.log('Error in connection:', error);
    }
}

// const startRedis = () => {
    
//     // redisClient.flushAll()
//     redisClient.on('connect', () => {
//         console.log('connected redis successfully')
//     });
//     redisClient.on("error", (err) => {
//         console.log('Error in redis:', err);
//     });
// }

startServer();
startDB();
// startRedis()
// emailQueue.isReady().then(()=>{
//     emailQueue.resume();
// });


