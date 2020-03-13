var CronJob = require('cron').CronJob;

const fetchGithub = require('./tasks/fetch-github.js');

new CronJob('* * * * *', fetchGithub, null, true);
