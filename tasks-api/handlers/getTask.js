const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

function getTask(id) {
    console.log(`getTask()`);

    if (!id) {
        throw new Error('To retrieve a task, please provide the task ID');
    }
        
    const params = {
        TableName: 'Tasks',
        Key: {
            taskId: id
        }
    };

    console.log('Retrieving task from DynamoDB', params);

    return db.get(params).promise()
        .then((res) => {
            console.log('Task retrieved!', res);
            return res;
        })
        .catch((err) => {
            console.log('Error retrieving task');
            throw err;
        });
}

module.exports = getTask;