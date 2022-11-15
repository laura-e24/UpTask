const mongoose = require('mongoose')

const tasksSchema = mongoose.Schema({
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
  state: {
    type: Boolean,
    default: false
  },
  deliveryDate: {
    type: Date,
    required: true,
    default: Date.now()
  },
  priority: {
    type: String,
    required: true,
    eum:['Low', 'Medium', 'High']
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  }
}, {
  timestamps: true
})

const Task = mongoose.model('Task', tasksSchema)
module.exports = Task;
export {}