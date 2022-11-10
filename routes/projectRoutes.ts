const express = require('express')
const controllers = require('../controllers/projectController.ts')
const checkAuth = require('../middleware/checkAuth.ts')

const { getAllProjects, getOneProject, addProject, updateProject, deleteProject, addCollaborator, deleteCollaborator, getAllTasks } = controllers;
const router = express.Router()

router.route('/')
  .get(checkAuth, getAllProjects)
  .post(checkAuth, addProject)

router.route('/:id')
  .get(checkAuth, getOneProject)
  .put(checkAuth, updateProject)
  .delete(checkAuth, deleteProject)

router.post('/add-collaborator/:id', checkAuth, addCollaborator)
router.post('/delete-collaborator/:id', checkAuth, deleteCollaborator)

router.get('/tasks/:id', checkAuth, getAllTasks)

module.exports = router;
export {}