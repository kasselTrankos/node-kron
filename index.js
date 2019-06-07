const {sheduler} = require('./lib/kron');


// cron.schedule('* * * * * *', () => {
//   console.log('running a task every minute');
// });

sheduler();