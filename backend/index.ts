const express = require('express')
const dotenv = require('dotenv')
const connect = require('./config/db.ts')
const userRoutes = require('./routes/userRoutes.ts')
const projectRoutes = require('./routes/projectRoutes.ts')
const taskRoutes = require('./routes/taskRoutes.ts')

const app = express()
app.use(express.json())

dotenv.config()

connect()

// Routing
app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto ${PORT}`)
})