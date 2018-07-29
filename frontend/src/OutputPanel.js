import React, { Component } from 'react';
import './outputPanel.scss';

class OutputPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='OutputPanel'>
        <h3>Database Records</h3>
        {this.rendorDBRecords()}
      </div>
    );
  }

  rendorDBRecords() {
    return (
      <div>
        <table className='table'>
        <tbody>
          <tr>
            <td>TimeStamp</td>
            <td>Value</td>
          </tr>
          {
            this.props.dbRecords.map(e =>
              <tr key={e.timestamp.getTime()}>
                <td>{e.timestamp.toUTCString()}</td>
                <td>{e.value}</td>
                <td>
                  <button className='btn btn-delete' onClick={() => this.props.handleDeleteButtonClick(e)}>X</button>
                </td>
              </tr>
            )
          }
        </tbody>
        </table>
        <button className='btn btn-light' onClick={this.props.handleRefreshButtonClick}>
          Refresh
        </button>
      </div>
    )
  }
}

export default OutputPanel;
