var fetch = require('node-fetch');
const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");
// const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);


const baseURL = 'https://jobs.github.com/positions.json'

async function fetchGithub() {

  let resCount = 1, onPage = 0;
  const allJobs = [];

  while(resCount > 0) {
    const results = await fetch(`${baseURL}?page=${onPage}`);
    const jobs = await results.json();
    allJobs.push(...jobs);
    resCount = jobs.length;
    console.log('got ', resCount, ' jobs');
    onPage++;
  }

  console.log('got ', allJobs.length, ' jobs fo real');

  const success = await setAsync('github', JSON.stringify(allJobs));
  console.log({success});
}

fetchGithub();

module.exports = fetchGithub;