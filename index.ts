import express from "express"
import connectDB from "./config/db"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes"

const app = express()
dotenv.config()
connectDB()

app.use('/api/users', userRoutes)
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})