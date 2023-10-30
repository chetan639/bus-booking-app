const Queue = require('bull');
const {sendBookingConfirmation,sendEmails} = require('../helpers/sendBookingConfirmation.js');

const emailQueue = new Queue('email');

const multipleEmailsQueue = new Queue('multiple-emails');

emailQueue.process(async (job,done)=>{
    // console.log('***************** Inside the worker *****************');
    const booking = job.data;
    await sendBookingConfirmation(booking);
    done();
});

emailQueue.on('completed',(job,result)=>{
    console.log(`${job} has been completed with result ${result}`);
});

multipleEmailsQueue.on('error',(error) => {
    	console.log(error);
})

multipleEmailsQueue.add(null, 
    { repeat: { cron: '01 23 * * 4,5,6' } }
);

multipleEmailsQueue.process(async(job,done)=>{
    // await job.remove();
    await sendEmails();
    done();
})

module.exports = {emailQueue,multipleEmailsQueue};