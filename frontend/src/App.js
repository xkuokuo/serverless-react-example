import React, { Component } from 'react';
import InputPanel from './InputPanel.js';
import OutputPanel from './OutputPanel.js';
import Dashboard from './Dashboard.js';
import { getUID } from './utils.js';
import { regions } from './Regions.js';
import 'whatwg-fetch'
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';

// TODO: remove this function
function createMockDBRecord(num) {
  var dbRecords = [];
  for (var i = 0; i < num; i ++) {
    dbRecords.push({
      timestamp: new Date(Math.floor(Math.random() * 1e12)),
      value: Math.floor(Math.random() * 100)})
  }
  return dbRecords;
}

// TODO: calling real thing
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbRecords: [],
      latencyMetrics: [],
      uid: getUID(),
      currentRegion: regions[0]
    }
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateDBRecord = this.updateDBRecord.bind(this);
    this.handleGetRecords = this.handleGetRecords.bind(this);
    this.getDBRecords = this.getDBRecords.bind(this);
    this.deleteDBRecord = this.deleteDBRecord.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.clearLatencyMetrics = this.clearLatencyMetrics.bind(this);
    this.updateLatencyMetrics = this.updateLatencyMetrics.bind(this);
    this.showLoadingModal = this.showLoadingModal.bind(this)
    this.hideLoadingModal = this.hideLoadingModal.bind(this)
  }

  render() {
    return (
      <div className='App'>
      <div id='loading-modal' className='modal'>
        <div className='loader'></div>
      </div>
      <header className='App-header'>
      <h1 className='App-title'>Enjoy Serverless React Application</h1>
      </header>
      <div className='row'>
      <div className='col-md-3'>
      <InputPanel handleUpdate={this.handleUpdate} currentRegion={this.state.currentRegion} regions={regions} handleRegionChange={this.handleRegionChange}/>
      </div>
      <div className='col-md-3'>
      <OutputPanel dbRecords={this.state.dbRecords} handleDeleteButtonClick={this.handleDelete} handleRefreshButtonClick={this.handleGetRecords}/>
      </div>
      <div className='col-md-6'>
      <Dashboard latencyMetrics={this.state.latencyMetrics} handleClearButtonClick={this.clearLatencyMetrics}/>
      </div>
      </div>
      </div>
    );
  }

  componentDidMount() {
    this.handleGetRecords();
  }

  handleUpdate(value) {
    this.showLoadingModal();
    var startTime = new Date();

    this.updateDBRecord(value, startTime)
      .then((data) => {
        this.hideLoadingModal();
        this.setState({
          dbRecords: this.state.dbRecords.concat({
            timestamp: startTime,
            value: value
          })
        });
      }).then(() => {
        var latency = (new Date()).getTime() - startTime.getTime();
        this.updateLatencyMetrics(startTime, 'updateRecord', latency);
      })
  }

  updateDBRecord(value, startTime) {
    return fetch(this.state.currentRegion.url + '/record/' + this.state.uid + '/' + startTime.getTime(),
      {
        method: 'put',
        body: JSON.stringify({
          value: value.toString()
        })
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.log("Error")
        }
      })
  }

  handleGetRecords() {
    this.setState({
      dbRecords: []
    })
    this.showLoadingModal();
    var startTime = new Date();
    this.getDBRecords()
      .then((data) => {
        this.hideLoadingModal();
        this.setState({
          dbRecords: data.map((e) => {
            return {
              timestamp: new Date(parseInt(e.timestamp)),
              value: e.value
            }
          })
        });
        var latency = (new Date()).getTime() - startTime.getTime();
        this.updateLatencyMetrics(startTime, 'getRecords', latency);
      })
  }

  getDBRecords() {
    // TODO: calling real thing
    return fetch(this.state.currentRegion.url + "/record/" + this.state.uid)
      .then((res) => {
        if (res.status === 200)
          return res.json();
        else {
          console.log("Error")
        }
        //return new Promise(function(resolve, reject) {
        //resolve(createMockDBRecord(5));
      })
  }

  handleDelete(record) {
    this.showLoadingModal();
    var startTime = new Date();
    this.deleteDBRecord(record)
      .then((data) => {
        this.hideLoadingModal();
        this.setState({
          dbRecords: this.state.dbRecords.filter((e) => e.timestamp != record.timestamp)
        })
        var latency = (new Date()).getTime() - startTime.getTime();
        this.updateLatencyMetrics(startTime, 'deleteRecord', latency);
      })
  }

  deleteDBRecord(record) {
    return fetch(this.state.currentRegion.url + '/record/' + this.state.uid + '/' + record.timestamp.getTime(),
      {
        method: 'delete'
      })
      .then((res) => {
        if (res.status === 200)
          return res.json()
        else
          console.log('Error')
      })
  }

  updateLatencyMetrics(time, name, latency) {
    this.setState({
      latencyMetrics: this.state.latencyMetrics.concat({
        time: time,
        name: name,
        latency
      })
    });
  }

  clearLatencyMetrics() {
    this.setState({latencyMetrics: []})
  }

  showLoadingModal() {
    var modal = document.getElementById('loading-modal');
    modal.style.display = 'block';
  }

  hideLoadingModal() {
    var modal = document.getElementById('loading-modal');
    modal.style.display = 'none';
  }

  handleRegionChange(r) {
    console.log("Region change: ")
    console.log(r)
    this.setState({
      currentRegion: r
    }, this.handleGetRecords)
  }
}

export default App;
