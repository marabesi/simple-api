import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/src/styles/ag-grid.scss';
import 'ag-grid-community/src/styles/ag-theme-balham/sass/ag-theme-balham.scss';
import './table.scss'

const url = process.env.REACT_APP_API_URL

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultColDef: {
        width: 180,
        resizable: true,
        sortable: true,
        filter: 'agTextColumnFilter'
      },
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

  fetchData = () => {
    fetch(`${url}/users?limit=10`)
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

  onPageSizeChanged = (val) => {
    console.log(val.target.value)
  }

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <select onChange={this.onPageSizeChanged} id="page-size">
          <option value="10">10</option>
          <option value="100">100</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
        </select>
        <div style={{ height: "100%", boxSizing: "border-box" }}>
          <div
            style={{
              height: "100%",
              width: "100%"
            }}
            className="ag-theme-balham"
          >
          <AgGridReact
            deltaColumnMode={true}
            defaultColDef={this.state.defaultColDef}
            onGridReady={this.fetchData}
            rowSelection="multiple"
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            quickFilterText={this.state.search}
            rowBuffer={200}
            pagination={true}
            floatingFilter={true}
            animateRows={true}
            paginationPageSize={20}
          />
          </div>
      </div>
      </div>
    )
  }
}