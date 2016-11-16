import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dispute from '../components/dispute'

class App extends Component {
  render() {
    return <div>
      <Dispute />
    </div>
  }
}
export default App;
