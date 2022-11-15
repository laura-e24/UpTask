const mongoose = require('mongoose')

const projectsSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  deliveryDate: {
    type: Date,
    default: Date.now()
  },
  client: {
    type: String,
    trim: true,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  contributors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
})

const Project = mongoose.model('Project', projectsSchema)
module.exports = Project;
export {}