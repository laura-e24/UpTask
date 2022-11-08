// import mongoose from 'mongoose'
const mongoose = require('mongoose')

const connectDB = async () => {
   try {
      const connection = await mongoose.connect(process.env.MONGO_URI)

      const url = `${connection.connection.host}: ${connection.connection.port}`
      console.log(`MongoDB conectado en: ${url}`)
   } catch (error) {
      console.log(`Error: ${error.message}`)
      // forzar a Node terminar los procesos si encuentra un error
      process.exit(1)
   }
}

module.exports = connectDB;