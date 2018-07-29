import React, { Component } from 'react';
import Chart from 'chart.js';
import './Dashboard.scss';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.createNewChart = this.createNewChart.bind(this);
    this.handleClearButtonClick = this.handleClearButtonClick.bind(this);
  }

  render() {
    return (
      <div className='Dashboard'>
        <h3>End To End Latency Dashboard</h3>
        <canvas id='myChart' ></canvas>
        <button id='clear-dashboard-btn' className='btn btn-info' onClick={this.handleClearButtonClick}>
          Clear
        </button>
      </div>);
  }

  componentDidMount() {
    this.chart = this.createNewChart();
  }

  createNewChart() {
    var ctx = document.getElementById('myChart');
    return new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'GET /record API Latency (ms)',
            name: 'getRecords',
            data:[],
            borderColor: '#17a2b8',
            pointBackgroundColor: '#17a2b8',
            xAxsID: 'time-axis',
            yAxsID: 'latency-axis'
          },
          {
            label: 'PUT /record API Latency (ms)',
            name: 'updateRecord',
            data:[],
            borderColor: '#7CB342',
            pointBackgroundColor: '#7CB342',
            xAxsID: 'time-axis',
            yAxsID: 'latency-axis'
          },
          {
            label: 'DELETE /record API Latency (ms)',
            name: 'deleteRecord',
            data:[],
            borderColor: '#E65100',
            pointBackgroundColor: '#E65100',
            xAxsID: 'time-axis',
            yAxsID: 'latency-axis'
          }
        ]
      },
      options:{
        scales: {
          xAxes: [{
            id: 'time-axis',
            type: 'time',
            position: 'bottom',
            time: {
              unit: 'second'
            }
          }],
          yAxes: [{
            id: 'latency-axis',
            type: 'linear',
            position: 'left',
            ticks: {
              min: 0,
              beginAtZero: true,
            }
          }]
        }
      }
    });
  }

  handleClearButtonClick() {
    this.props.handleClearButtonClick();
    this.createNewChart();
  }

  componentDidUpdate(prevProps) {
    this.chart.data.datasets.forEach((ds) =>{
      ds.data = this.props.latencyMetrics.filter(
        (e) => e.name === ds.name
      ).map((e) => {
        console.log("ForEach:"  + e)
        return {
          x: e.time,
          y: e.latency
        }
      })
    });
    this.chart.update();
  }
}

export default Dashboard;
