import React from 'react';
import './App.css';

import Jobs from './jobs.js';

const JOB_API_URL = 'http://localhost:3001/jobs';

const mockJobs = [
  {
    title: "Software Developer One", 
    company: "Google",
    pay: "75,000"
  },
  {
    title: "UI/UX Designer",
    company: "Facebook",
    pay: "80,000"
  }
]

async function fetchJobs(updateCb) {
  const res = await fetch(JOB_API_URL);
  const json = await res.json();

  updateCb(json);

  console.log({json});
}

function App() {
  const [jobsList, updateJobs] = React.useState([]);

  React.useEffect(() => {
    fetchJobs(updateJobs);
  }, [])

  return (
    <div className="App">
      <Jobs jobs={jobsList}/>
    </div>
  );
}

export default App;
