const fs = require('fs');
const CronJob = require('cron').CronJob;
const moment = require('moment');
const FILE = 'calendar.json';

const readerFile =  (file = FILE) => {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

const isDates = dates => Boolean(dates.length);

const throwCron = date => {
  const job = new CronJob(end, function() {
    const d = new Date();
    const h = moment();
    // console.log('Specific date:', moment(date).format('H:mm:ss'), ', onTick at:', moment(end).format('H:mm:ss'), 'kokoko', h.format('hh:mm:ss'));
  });
  console.log(dates);
  job.start();

};

const useDates = dates => {
  let date = new Date();
  const end = moment(dates[0]);
  console.log(end);
  //date.setSeconds(date.getSeconds()+4);
};

const sheduler  = () => {
  const {dates} = readerFile();
  if(isDates(dates)) {
    useDates(dates);
  }
  console.log(dates, new Date(), dates.length, isDates(dates));
};

module.exports =  {sheduler}
