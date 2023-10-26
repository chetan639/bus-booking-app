const Queue = require('bull');

console.log(Queue);

const emailQueue = new Queue('sending emails');

emailQueue.process(async function(job,done){
    // job.progress(42);

    console.log('***************** Inside the worker *****************');

    done();
});

emailQueue.on('completed',(job,result)=>{
    console.log(`${job} has been completed with result ${result}`);
})

module.exports = emailQueue;