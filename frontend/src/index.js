import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const App = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    axios.get('https://YOUR_LAMBDA_ENDPOINT')
      .then(response => {
        setTime(response.data.time);
      })
      .catch(error => {
        console.error('There was an error fetching the time!', error);
      });
  }, []);

  return (
    <div>
      <h1>Current Time from RDS MySQL</h1>
      <p>{time}</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
