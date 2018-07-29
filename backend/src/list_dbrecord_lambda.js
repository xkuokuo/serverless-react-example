var AWS = require('aws-sdk');

const createResponse = (statusCode, body) => {
  // to restrict the origin for CORS purposes, replace the wildcard
  // origin with a specific domain name
  return {
    statusCode: statusCode,
    body: body,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }
};

const convertToDataModel = (ddbResult) => {
  var records = [];
  ddbResult.Items.forEach((e) => {
    var ddbRecord = {}
    ddbRecord['uid'] = e.UID.S;
    ddbRecord['timestamp'] = e.Timestamp.N;
    ddbRecord['value'] = e.Value.S;
    records.push(ddbRecord)
  })
  return records;
}

exports.handler = function(event, context, callback) {
  // extract message from event
  var uid = event['pathParameters']['uid']

  var params = {
    ExpressionAttributeValues: {
      ":v1": {
        S: uid
      }
    },
    KeyConditionExpression: "UID = :v1",
    TableName: process.env.TABLE_NAME
  };

  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
  dynamodb.query(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
      callback(null,createResponse(501, JSON.stringify(err)))
    } else {
      console.log(data);           // successful response
      callback(null,createResponse(200, JSON.stringify(convertToDataModel(data))))
    }
  });
}
