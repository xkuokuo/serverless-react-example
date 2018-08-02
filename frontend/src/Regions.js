class Region {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }
}

const regions = [
  new Region('Virginia (us-east-1)', 'https://api-serverless-example-us-east-1.xinkuo.me'),
  new Region('California (us-west-1)', 'https://api-serverless-example-us-west-1.xinkuo.me'),
  new Region('Oregon (us-west-2)', 'https://api-serverless-example-us-west-2.xinkuo.me'),
  new Region('Tokyo (ap-northeast-1)', 'https://api-serverless-example-ap-northeast-1.xinkuo.me'),
  new Region('Singapore (ap-southeast-1)', 'https://api-serverless-example-ap-southeast-1.xinkuo.me'),
  new Region('Dublin (eu-west-1)', 'https://api-serverless-example-eu-west-1.xinkuo.me')
]

export { regions }
