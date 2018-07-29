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

exports.handler = function(event, context, callback) {
  // extract message from event
  var uid = event['pathParameters']['uid']
  var timestamp = event['pathParameters']['timestamp'];

  var params = {
    Key: {
      "UID": {
        S: uid
      },
      "Timestamp": {
        N: timestamp
      }
    },
    TableName: process.env.TABLE_NAME
  };

  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
  dynamodb.deleteItem(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });

  callback(null,createResponse(200, JSON.stringify({"status": "success"})))
}
