const fetch = require('node-fetch');
const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://jobs.github.com/positions.json';

async function fetchGithub() {

  let resCount = 1, onPage = 0;
  const allJobs = [];

  while(resCount > 0) {
    try {
      const results = await fetch(`${baseURL}?page=${onPage}`);
      const jobs = await results.json();
      allJobs.push(...jobs);
      resCount = jobs.length;
      console.log('got ', resCount, ' jobs');
      onPage++;
    } catch (e) {
      console.log(e);   // caught here - note this was added in an attempt to address the first screenshot taken on Apr 2nd. 
    }
  };

  console.log('got ', allJobs.length, ' jobs fo real');


  // filter algorithm
  const jrJobs = allJobs.filter(job => {
    const jobTitle = job.title.toLowerCase();
    // algo logic
    if (
      jobTitle.includes('senior') ||
      jobTitle.includes('manager') ||
      jobTitle.includes('sr.') ||
      jobTitle.includes('architect')
    ) {
      return false 
    } 
    return true;
  })

  console.log('filtered down to ' + jrJobs.length);

  // sets redis
  const success = await setAsync('github', JSON.stringify(jrJobs));
  console.log({success});
};

module.exports = fetchGithub;