class Region {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }
}

const regions = [
  new Region('Virginia (us-east-1)', ''),
  new Region('California (us-west-1)', ''),
  new Region('Oregon (us-west-2)', '')
]

export { regions }
