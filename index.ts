// import express from 'express'
const express = require('express')
const dotenv = require('dotenv')
const connect = require('./config/db.ts')
const userRoutes = require('./routes/userRoutes.ts')

const app = express()
app.use(express.json())

dotenv.config()

connect()

// Routing
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
   console.log(`Server corriendo en el puerto ${PORT}`)
})