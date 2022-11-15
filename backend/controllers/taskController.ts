const Task = require('../models/Task.ts')
const Project = require('../models/Project.ts')

const addTask = async (req, res) => {
  const { project } = req.body;
  const projectExists = await Project.findById(project)

  if (!projectExists) {
    const error = new Error('El proyecto no existe.')
    return res.status(404).json({ msg: error.message })
  }

  if (projectExists.creator.toString() !== req.user._id.toString()) {
    const error = new Error('No tenés los permisos para añadir tareas.')
    return res.status(401).json({ msg: error.message })
  }

  try {
    const storedTask = await Task.create(req.body)
    res.json(storedTask)
  } catch (error) {
    throw new Error(error)
  }
}

const getOneTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id).populate('project')
  
  if (!task) {
    const error = new Error('No existe la tarea.')
    return res.status(404).json({ msg: error.message })
  }

  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('No tenés los permisos para esta acción.')
    return res.status(403).json({ msg: error.message })
  }
  
  res.json(task)
}

const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id).populate('project')
  
  if (!task) {
    const error = new Error('No existe la tarea.')
    return res.status(404).json({ msg: error.message })
  }

  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('No tenés los permisos para esta acción.')
    return res.status(401).json({ msg: error.message })
  }

  task.name = req.body.name || task.name;
  task.description = req.body.description || task.description;
  task.priority = req.body.priority || task.priority;
  task.deliveryDate = req.body.deliveryDate || task.deliveryDate;

  try {
    const storedTask = await task.save()
    res.json(storedTask)
  } catch (error) {
    console.log(error)
  }
}

const deleteTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id).populate('project')

  if (!task) {
    const error = new Error('No existe la tarea.')
    return res.status(404).json({ msg: error.message })
  }

  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('Usuario no autorizado.')
    return res.status(401).json({ msg: error.message })
  }

  try {
    await task.deleteOne()
    res.json({ msg: 'Tarea eliminada.' })
  } catch (error) {
    throw new Error(error)
  }
}

const updateState = async (req, res) => {}


module.exports = {
  addTask,
  getOneTask,
  updateTask,
  deleteTask,
  updateState
}
export {}