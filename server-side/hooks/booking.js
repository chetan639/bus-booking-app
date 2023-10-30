const emailQueue = require('../workers/email.js');
module.exports = (models) => {
    models.Booking.afterCreate((booking,options)=>{
        // console.log('Booking confirmed!',booking);
        emailQueue.add(booking);
    })
    console.log('After create hook added!');
}