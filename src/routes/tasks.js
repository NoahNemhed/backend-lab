// routes/task.js

// import express and setup router
const express = require('express')
const router = express.Router();



// import taskController
const taskController = require('../controllers/taskController')

// get all tasks
router.get('/tasks', taskController.getAllTasks);

// get task by id
router.get('/tasks/:id', taskController.getTaskById);

// add task
router.post('/tasks', taskController.addTask)

// update task
router.put('/tasks/:id', taskController.updateTaskById)

// delte task
router.delete('/tasks/:id', taskController.deleteTaskById)

module.exports = router;

