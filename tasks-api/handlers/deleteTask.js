const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

function deleteTask(id) {
    console.log(`deleteTask()`);

    if (!id) {
        throw new Error('To delete a task, please provide the task ID');
    }
        
    const params = {
        TableName: 'Tasks',
        Key: {
            taskId: id
        }
    };

    console.log('Deleting task from DynamoDB', params);

    return db.delete(params).promise()
        .then((res) => {
            console.log('Task deleted!', res);
            return res;
        })
        .catch((err) => {
            console.log('Error deleting task');
            throw err;
        });
}

module.exports = deleteTask;