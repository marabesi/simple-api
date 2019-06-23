import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';

import './App.css';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { headerName: "uid", field: "uid", sortable: true, filter: true, checkboxSelection: true, headerCheckboxSelection: true },
        { headerName: "name", field: "displayName", sortable: true, filter: true },
        { headerName: "email", field: "email", sortable: true, filter: true },
        { headerName: "photo", field: "photoUrl", sortable: true, filter: true }
      ],
      rowData: [],
      search: ''
    }
  }

  componentDidMount() {
    fetch('http://localhost:8000/users')
      .then(data => data.json())
      .then(json => this.setState({
        ...this.state.rowData, rowData: json
      }))
  }

  onButtonClick = e => {
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map(node => node.data)
    const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ')
    console.log(`Selected nodes: ${selectedDataStringPresentation}`)
  }

  filter = (event) => {
    this.setState({
      ...this.state.search, search: event.target.value
    })
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
          height: '400px',
          width: '99%',
          margin: '5px auto'
        }}
        >
        <input type="text" onChange={this.filter} />
        
        <AgGridReact
          rowSelection="multiple"
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          quickFilterText={this.state.search}
          rowBuffer={10}
        />
      </div>
    );
  }
}

export default App;
