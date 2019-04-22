'use strict';

const Api = require('claudia-api-builder');
const api = new Api();

const { getAllTasks, getTask, addTask, completeTask, deleteTask } = require('./handlers');

api.get('/tasks', () => {
    return getAllTasks();
});

api.get('/tasks/{id}', (req) => {
    return getTask(req.pathParams.id);
});

api.post('/tasks', (req) => {
    return addTask(req.body);
});

api.post('/tasks/{id}/done', (req) => {
    return completeTask(req.pathParams.id);
});

api.delete('/tasks/{id}', (req) => {
    return deleteTask(req.pathParams.id);
});

module.exports = api;