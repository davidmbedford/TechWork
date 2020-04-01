import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function Job({job}) {
  return (
    <div className={'job'}>
      <div className="row">
      {job.title} - {job.company} - {job.pay}
      </div>
    </div>
  )
};

