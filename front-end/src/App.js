import React, { Component } from 'react';
import Table from './components/table/Table'

require('dotenv').config()

class App extends Component {

  render() {
    return (
      <Table />
    );
  }
}

export default App;
