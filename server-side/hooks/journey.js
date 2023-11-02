const elasticQueue = require('../workers/addToElastic.js');
module.exports = models=>{
    models.Journey.afterCreate(async (journey,options)=>{
           elasticQueue.add(journey);
    });
}