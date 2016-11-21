import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dispute from '../components/dispute'
import axios from 'axios';

const handleSubmit = (data) => {
  axios.post('/dispute/add', data)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
};

class App extends Component {
  render() {
    return <div>
      <Dispute onSubmit={handleSubmit} />
    </div>
  }
};

export default App;
