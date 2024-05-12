const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  AWS.config.update({ region: 'us-east-1' }); 

  // Parse the JSON data from the request body
  const requestBody = JSON.parse(event.body);

  const sns = new AWS.SNS();

  const params = {
    Protocol: 'email',
    TopicArn: requestBody.arn, // Access ARN from the request body
    Endpoint: requestBody.emailAddress // Access email address from the request body
  };

  try {
    const data = await sns.subscribe(params).promise();
    console.log('Subscription ARN:', data.SubscriptionArn);
    return { statusCode: 200, body: 'Subscription successful' };
  } catch (err) {
    console.error('Error subscribing:', err);
    return { statusCode: 500, body: 'Error subscribing to SNS topic' };
  }
};
