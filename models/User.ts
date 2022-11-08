const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true
   },
   password: {
      type: String,
      required: true,
      trim: true
   },
   email: {
      type: String,
      required: true,
      trim: true,
      unique: true
   },
   token: {
      type: String
   },
   confirmed: {
      type: Boolean,
      default: false
   }
}, {
   timestamps: true
})

// Antes de guardar en la base de datos (middleware)...
userSchema.pre('save', async function(next) {
   const salt = await bcrypt.genSalt(10)

   // this acá hace referencia al modelo del usuario
   // que le estamos pasando para guardar

   // next se "saltea" el middleware actual y pasa al siguiente
   // si la contraseña ya está hasheada, pasá al siguiente middlware"
   // si no, continúa la ejecución
   if (!this.isModified('password')) next()
   this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.checkPassword = async function (formPassword) {
   return await bcrypt.compare(formPassword, this.password)
}

const User = mongoose.model('User', userSchema)
module.exports = User;

export {}