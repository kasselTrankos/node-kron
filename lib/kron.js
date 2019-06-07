const fs = require('fs');
const compose = require('lodash/fp/compose');
const CronJob = require('cron').CronJob;
const moment = require('moment');
const FILE = 'calendar.json';
let kalendar; 
let gotNextKal;

const defaultScheduler = "* * * * *"; //every minute 
const gotDates = dates => Boolean(dates.length);
const got = arr => index => Boolean(arr[index]);
const get = arr => index => arr[index];
const getMoment = value => moment(value);
const notifyEnd = () => {console.log('hemos terminado, y no es normal o si?');};
const readerFile =  (file = FILE) => {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
};
const kalendarSort = (date1, date2)  => {
  if (moment(date1) > moment(date2)) return 1;
  if (moment(date1) < moment(date2)) return -1;
  return 0;
};
const throwShcdulerCron = kron => {
  const job = new CronJob(kron, function() {
    console.log( `shduler(${kron}): ${moment().format('H:mm:ss')}`);
  });
  console.log('After job instantiation');
  job.start();
};
const throwDateCron =  dates => index => {
  const date = moment(dates[index]);
  console.log(date.format('hh:mm:ss'));
  const job = new CronJob(date, () => {
    const next = ++index;
    gotNextKal(next)
      ? kalendar(next)
      : notifyEnd();
  });
 job.start();
};

const useDates = dates => {
  kalendar = throwDateCron(dates);
  gotNextKal = got(dates);
 
  kalendar(0);
};


const sheduler  = () => {
  const {dates, sheduler, configuration: {priority}} = readerFile();
  if(gotDates(dates) && priority === 'dates') {
    const newDates = dates.filter(date => moment(date) > moment()).sort(kalendarSort);
    console.log(newDates);
    useDates(newDates);
  } else {
    throwShcdulerCron(sheduler);
  }
};

module.exports =  {sheduler}
