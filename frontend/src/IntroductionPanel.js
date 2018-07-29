import React, { Component } from 'react';
import './IntroductionPanel.scss';
import profile_pic from '../public/img/profile_picture.jpg'

class IntroductionPanel extends Component {
  constructor(props) {
    super(props);
    // TODO: remove initial val
    this.state = {
    }
  }

  render() {
    return (
      <div className='IntroductionPanel row'>
      <div className='col-md-3 col-sm-6'>
      <h3>What</h3>
      <p>This is a tool for testing AWS serverless latency across different AWS regions. </p>
      <p><b>The whole application is serverless</b> and it's built on top of AWS S3, AWS CloudFront, AWS API Gateway, AWS Lambda, and AWS DynamoDB.</p>
      </div>
      <div className='col-md-3 col-sm-6'>
      <h3>Why</h3>
        <p><b>AWS Lambda is AWESOME</b>, and you can use it together with other AWS services to build a serverless web app. </p>
        <p><b>However</b> a common question people (and I) keep asking is, is that good enough? How about the latencies? Oh also they mentioned something like Cold Start?</p>
      </div>
      <div className='col-md-3 col-sm-6'>
      <h3>How</h3>
      <p>1. Select a AWS region.</p>
      <p>2. Enter a random value and then try to create/read/delete it.</p>
      <p>3. Check the end 2 end latency below and have fun =D</p>
      </div>
      <div className='col-md-3 col-sm-6'>
      <h3>Who
      <img className='profile-pic' src={profile_pic} />
      </h3>
      <p>Hey I'm xkuokuo. I like coding, I like zoos. When I'm not working I've been trying to learn something new. You can find more about me at <a href='https://xinkuo.me'>xinkuo.me</a></p>
      </div>
      </div>
    );
  }
}

export default IntroductionPanel;
