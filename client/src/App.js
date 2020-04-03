import React from 'react';
import './App.css';

import Jobs from './jobs.js'

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

function App() {
  return (
    <div className="App">
      <Jobs jobs={mockJobs}/>
    </div>
  );
}

export default App;
