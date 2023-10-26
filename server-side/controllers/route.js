const {Models} = require('../models');
const {getOrSetToRedis,clearRedis} = require('../utils/redis.js');

const getRoute = async(request,reply)=>{
    const {routeId} = request.params;

    try {
        const route = await getOrSetToRedis(`route:${routeId}`, Models.Route, async (Route)=>{
            try {
                const route = await Route.findOne({
                    where:{
                        routeId: routeId
                    }
                });
                return route;   
            } catch (error) {
                console.log(error);
                return;
            }
        })
        if(!route){
            return reply('Error in getting route').code(401);
        }

        return reply(route).code(200);
    } catch (error) {
        console.log(error);
        return reply('Internal server error').code(500);
    }
}

const createRoute = async (request,reply)=>{
    const routeDetails = request.payload;

    try {
        const newRoute = await Models.Route.create(routeDetails);

        if(!newRoute){
            return reply('Error in creating route!').code(401);
        }

        return reply('Created route Successfully').code(201);
    } catch (error) {
        console.log(error);
        return reply('Internal Server Error').code(500);
    }
};

const updateRoute = async(request,reply)=>{
    const updatedDetails = request.payload;
    const {routeId} = request.params;
    try {
        const route = await Models.Route.findOne({
            where:{
                routeId: routeId
            }
        });

        if (!route) {
            return reply('route does not exist').code(401);
        }

        const updatedRoute = await Models.Route.update(
            updatedDetails,
            {
                where: {
                    routeId: routeId
                }
            }
        );
        
        if(!updatedRoute){
            return reply('Error updating route').code(401);
        }

        return reply('route details updated successfully').code(200);
    } catch (error) {
        console.log(error);
        return reply('Internal Server Error').code(500);
    }
};

const deleteRoute = async(request,reply)=>{
    const {routeId} = request.params;
    try {
        const route = await Models.Route.findOne({
            where:{
                routeId: routeId
            }
        });

        if (!route) {
            return reply('route does not exist').code(401);
        }
        const deletedRoute = await Models.Route.destroy({
                where: {
                    routeId: routeId
                }
            }
        );
        if(!deletedRoute){
            return reply('Error deleting route').code(401);
        }
        return reply('route details deleted').code(200);
    } catch (error) {
        console.log(error);
        return reply('Internal Server Error').code(500);
    }
}

module.exports = {
    getRoute,
    createRoute,
    updateRoute,
    deleteRoute
}