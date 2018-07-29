import React, { Component } from 'react';
import './InputPanel.scss';

class InputPanel extends Component {
  constructor(props) {
    super(props);
    // TODO: remove initial val
    this.state = {
      value: Math.random()
    }
    // This binding is necessary to make `this` work in the callback
    this.handleUpdate = this.handleUpdate.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.createCheckboxes = this.createCheckboxes.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
  }

  render() {
    return (
      <div className='InputPanel'>
        <div>
          <h3 className=''>Select An AWS Data Center <br/>(default to US Virginia)</h3>
          <div className="btn-group-vertical btn-group-toggle" data-toggle="buttons">
            {
              this.createCheckboxes()
            }
          </div>
        </div>
        <br/>
        <div>
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
    this.props.handleUpdate(this.state.value);
    // TODO: remove this
    this.setState({
      value: Math.random()
    })
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
