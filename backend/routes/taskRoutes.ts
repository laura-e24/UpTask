const express = require('express')
const controllers = require('../controllers/taskController.ts')
const checkAuth = require('../middleware/checkAuth.ts')

const { addTask,
  getOneTask,
  updateTask,
  deleteTask,
  updateState 
} = controllers;

const router = express.Router()

router.post('/', checkAuth, addTask)

router.route('/:id')
  .get(checkAuth, getOneTask)
  .put(checkAuth, updateTask)
  .delete(checkAuth, deleteTask)

router.post('/state/:id', checkAuth, updateState)


module.exports = router;
export {}