const Project = require('../models/Project.ts')

const getAllProjects = async (req, res) => {
  // Obtener SÓLO los proyectos del usuario autenticadod
  const projects = await Project.find().where('creator').equals(req.user)

  res.json(projects)
}

const getOneProject = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id)

  if (!project) {
    const error = new Error('Proyecto no encontrado.')
    return res.status(404).json({ msg: error.message })
  }
  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('Usuario no autorizado.')
    return res.status(401).json({ msg: error.message })
  }
  res.json(project)
}

const addProject = async (req, res) => {
  const project = new Project(req.body)
  project.creator = req.user._id

  try {
    const storedProject = await project.save()
    res.json(storedProject)
  } catch (error) {
    console.log(error)
  }
}

const updateProject = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id)

  if (!project) {
    const error = new Error('Proyecto no encontrado.')
    return res.status(404).json({ msg: error.message })
  }
  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('Usuario no autorizado.')
    return res.status(401).json({ msg: error.message })
  }

  project.name = req.body.name || project.name;
  project.description = req.body.description || project.description;
  project.deliveryDate = req.body.deliveryDate || project.deliveryDate;
  project.client = req.body.client || project.client;

  try {
    const storedProject = await project.save()
    res.json(storedProject)
  } catch (error) {
    throw new Error(error)
  }
}

const deleteProject = async (req, res) => {
  const { id } = req.params;

  let project = await Project.findById(id)

  if (!project) {
    const error = new Error('Proyecto no encontrado.')
    return res.status(404).json({ msg: error.message })
  }
  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('Usuario no autorizado.')
    return res.status(401).json({ msg: error.message })
  }

  try {
    await project.deleteOne()
    res.json({ msg: 'Proyecto eliminado.' })
  } catch (error) {
    throw new Error(error)
  }
}

const addCollaborator = async (req, res) => {

}

const deleteCollaborator = async (req, res) => {

}

const getAllTasks = async (req, res) => {
  
}

module.exports = {
  getAllProjects,
  getOneProject,
  addProject,
  updateProject,
  deleteProject,
  addCollaborator,
  deleteCollaborator,
  getAllTasks
}