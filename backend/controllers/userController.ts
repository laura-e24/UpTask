const User = require('../models/User.ts')
const generateId = require('../helpers/generateId.ts')
const generateJWT = require('../helpers/generateJWT.ts')
const registerEmail = require('../helpers/emails.ts')

const register = async (req, res) => {

  // Evitar registros duplicados
  const { email } = req.body;
  const userExists = await User.findOne({ email })

  if (userExists) {
    const error = new Error('Usuario ya registrado.')
    return res.status(400).json({ msg: error.message })
  }
  try {
    const user = new User(req.body)
    user.token = generateId()
    const storedUser = await user.save()

    // Envía email de confirmación
    registerEmail({
      email: user.email,
      name: user.name,
      token: user. token
    })

    res.json({
      msg: 'Usuario creado correctamente. Revisá tu email para confirmar tu cuenta.',
      user: storedUser
    })
  } catch (error) {
    throw Error(error)
  }
}

const authenticate = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email })

  if (!user) {
    const error = new Error('El usuario no existe.')
    return res.status(404).json({ msg: error.message })
  }

  if (!user.confirmed) {
    const error = new Error('Tu cuenta no ha sido confirmada.')
    return res.status(403).json({ msg: error.message })
  }

  if (await user.checkPassword(password)) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id)
    })
  } else {
    const error = new Error('La contraseña es incorrecta.')
    return res.status(401).json({ msg: error.message })
  }
}

const confirmAccount = async (req, res) => {
  const { token } = req.params;

  // Buscamos si existe el token en la DB
  const confirmUser = await User.findOne({ token })

  // Si no existe, el token es inválido
  if (!confirmUser) {
    const error = new Error('Token no válido.')
    return res.status(403).json({ msg: error.message })
  }

   // Caso contrario...
  try {
    // Confirmamos el usuario
    confirmUser.confirmed = true;
    // Reseteamos el token ya que es de un único uso
    confirmUser.token = '';
    // Almcenamos en la DB
    // --- sin esta línea NO se actualizan los datos en la DB ---
    await confirmUser.save()
    
    // Enviamos la respuesta final
    res.json({ msg: 'Usuario confirmado.' })
  } catch (error) {
    throw new Error(error)
  }
}

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email })

  if (!user) {
    const error = new Error('El usuario no existe.')
    return res.status(404).json({ msg: error.message })
  }

  try {
    user.token = generateId()
    await user.save()
    res.json({ msg: 'Hemos enviado un email con las indicaciones.' })
  } catch (error) {
    throw new Error(error)
  }
}

const confirmToken = async (req, res) => {
  const { token } = req.params;

  const validToken = await User.findOne({ token })

  if (validToken) {
    res.json({ msg: 'Token válido. El usuario existe.' })
  }
  else {
    const error = new Error('Token no válido')
    res.status(403).json({ msg: error.message })
  }
}

const newPassword = async (req, res) => {
  // El token se envía por url
  const  { token } = req.params;
  // Y la password por el body
  const  { password } = req.body;

  const user = await User.findOne({ token })

  if (user) {
    user.password = password;
    user.token = '';
    try {
      await user.save()
      res.json({ msg: 'Contraseña restablecida exitosamente.' })
    } catch (error) {
      throw new Error(error)
    }
  }
  else {
    const error = new Error('Token no válido.')
    res.status(403).json({ msg: error.message })
  }
}

const profile = async (req, res) => {
  const { user } = req;
  res.json(user)
}

module.exports = {
  register,
  authenticate,
  confirmAccount,
  forgotPassword,
  confirmToken,
  newPassword,
  profile
}