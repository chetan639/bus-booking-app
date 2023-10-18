const Hapi = require('hapi');
const Joi = require('joi');
const config = require('config');
const serverConfig = config.get('server');

const { sequelize } = require('./models/index.js')

const server = new Hapi.Server();

const init = async () => {
    
    server.connection({
        host: serverConfig.host,
        port: serverConfig.PORT,
    })
    
    await server.start((error, value) => {
        if (error) console.log('err', error)
    });
    console.log(`Server running`);
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
        console.log('Error in connection:',error);
    }
}

init();
startDB();