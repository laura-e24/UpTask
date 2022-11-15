const jwt = require('jsonwebtoken')
const User = require('../models/User.ts')

const checkAuth = async (req, res, next) => {
  let token; 

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Con esto se crea una sesión de usuario:
      // se busca en la DB según el id, y el usuario
      // hallado se guarda en una nueva variable "user"
      // dentro del request. El select() en este caso es para omitir
      // esos valores al asignarlos a la variable
      req.user = await User.findById(decoded.id).select('-password -confirmed -token -createdAt -updatedAt -__v')
      return next()
    } catch (error) {
      return res.status(401).json({ msg: 'Token inválido.' })
    }
  }

  if (!token) {
    const error = new Error('Se requiere iniciar sesión.')
    return res.status(401).json({ msg: error.message })
  }

  next()
}

module.exports = checkAuth;
export {}