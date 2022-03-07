import express from "express"
import connectDB from "./config/db"
import dotenv from "dotenv"
const app = express()
dotenv.config()
connectDB()

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})