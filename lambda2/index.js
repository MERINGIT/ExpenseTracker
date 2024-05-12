const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  try {
    const sns = new AWS.SNS();
    const subject="Daily Notification"
    const description="Hi,you didn't get into the Application today,please sign in to see the latest updates";

    // Publish SNS notification
    const message = `${description}`;
    await sns.publish({
      Message: message,
      Subject: 'Daily Notification',
      TopicArn: 'arn:aws:sns:us-east-1:426085379010:DailyNotification'
    }).promise();

    return { statusCode: 200, body: 'SNS notification sent successfully' };
  } catch (error) {
    console.error('Error:', error);
    return { statusCode: 500, body: 'Error sending SNS notification' };
  }
};
