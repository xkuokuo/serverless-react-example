import React, { Component } from 'react';
import './InputPanel.scss';

function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

class InputPanel extends Component {
  constructor(props) {
    super(props);
    // TODO: remove initial val
    this.state = {
      value: ''
    }
    // This binding is necessary to make `this` work in the callback
    this.handleUpdate = this.handleUpdate.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.createCheckboxes = this.createCheckboxes.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
  }

  render() {
    return (
      <div className='InputPanel row'>
        <div className='col-md-6 col-sm-6'>
          <h3 className=''>Select AWS Region</h3>
          <div className="btn-group-vertical btn-group-toggle" data-toggle="buttons">
            {
              this.createCheckboxes()
            }
          </div>
        </div>
        <br/>
        <div className='col-md-6 col-sm-6'>
          <h3 className=''>Add A New Record</h3>
          <form action='#'>
            <div className='form-group'>
              <label>
                * Value
              </label>
              <input className='form-control' type='input' name='value' id='value' placeholder='A Random Value' required='required' data-error='Value is required' value = {this.state.value} onChange={this.onValueChange}/>
            </div>
            <input type='submit' className='btn btn-success' value='submit' onClick={this.handleUpdate}/>
          </form>
        </div>
      </div>
    );
  }

  handleUpdate(e) {
    e.preventDefault();
    if (!isEmptyOrSpaces(this.state.value))
      this.props.handleUpdate(this.state.value);
  }

  onValueChange(e) {
    this.setState({value : e.target.value})
  }

  handleRegionChange(region) {
    this.props.handleRegionChange(region);
  }

  createCheckboxes() {
    return this.props.regions.map((r) => {
            var checked = this.props.currentRegion.name === r.name
            return <label key={r.name} className={'btn btn-light ' + (checked ? 'active' : '')}>
              <input type='radio' name='options' id='option1' onChange={() => {this.handleRegionChange(r)}} checked={checked}/> {r.name}
            </label>})
  }
}

export default InputPanel;
