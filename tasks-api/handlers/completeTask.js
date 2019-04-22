const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

function completeTask(id) {
    console.log(`updateTask()`);

    if (!id) {
        throw new Error('To complete a task, please provide task ID');
    }
        
    const params = {
        TableName: 'Tasks',
        Key: {
            taskId: id
        },
        AttributeUpdates: {
            done: {
                Action: 'PUT',
                Value: true
            }
        }
    };

    console.log('Updating task in DynamoDB', params);

    return db.update(params).promise()
        .then((res) => {
            console.log('Task updated!', res);
            return res;
        })
        .catch((err) => {
            console.log('Error updating task');
            throw err;
        });
}

module.exports = completeTask;