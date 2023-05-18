const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db.ts')
const userRoutes = require('./routes/userRoutes.ts')
const projectRoutes = require('./routes/projectRoutes.ts')
const taskRoutes = require('./routes/taskRoutes.ts')
const cors = require('cors')

const app = express()
app.use(express.json())

dotenv.config()

connectDB()

// Configurar CORS
// const whitelist = [process.env.FRONTEND_URL, 'http://localhost:4000', '*']
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin)) {
//       // Puede consultar la API
//       callback(null, true)
//     } else {
//       // No puede consultar la API
//       callback(new Error('Error de CORS'))
//     }
//   }
// }

const corsOptions = {
  origin: [process.env.FRONTEND_URL, 'http://localhost:4000', '*'],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions))

// Routing
app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto ${PORT}`)
})