const uid = require('uid-safe');
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

function addTask(task) {
    console.log(`addTask()`);

    if (!task) {
        throw new Error('To add a task, please provide a task name');
    }
        
    const params = {
        TableName: 'Tasks',
        Item: {
            taskId: uid.sync(24),
            name: task || 'unknown',
            done: false
        }
    };

    console.log('Adding task to DynamoDB', params);

    return db.put(params).promise()
        .then((res) => {
            console.log('Task added!', res);
            return res;
        })
        .catch((err) => {
            console.log('Error adding task');
            throw err;
        });
}

module.exports = addTask;