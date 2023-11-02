const Queue = require('bull');

const elasticQueue = new Queue('elastic');
const {addJourneyToElastic} = require('../helpers/addToElastic.js');

elasticQueue.process(async (job,done)=>{
    const journey = job.data;
    await addJourneyToElastic(journey);
    done();
})

module.exports = elasticQueue;