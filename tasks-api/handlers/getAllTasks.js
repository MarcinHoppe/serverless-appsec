const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

function getAllTasks() {
    console.log(`getAllTasks()`);
        
    const params = {
        TableName: 'Tasks'
    };

    console.log('Retrieving task from DynamoDB', params);

    return db.scan(params).promise()
        .then((res) => {
            console.log('Tasks retrieved!', res);
            return res;
        })
        .catch((err) => {
            console.log('Error retrieving tasks');
            throw err;
        });
}

module.exports = getAllTasks;