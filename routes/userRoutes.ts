const express = require('express')
const controllers = require('../controllers/userController.ts')
const checkAuth = require('../middleware/checkAuth.ts')
const router = express.Router()

const { register, authenticate, confirmAccount, forgotPassword, confirmToken, newPassword, profile } = controllers;

// Autenticación, registro y confirmación del usuario
router.post('/', register)
router.post('/login', authenticate)
router.get('/confirm/:token', confirmAccount)
router.post('/forgot-password', forgotPassword)
router.get('/profile', checkAuth, profile)


// Estas dos líneas de abajo comentadas equivalen a la 
// de abajo de todo

// router.get('/forgot-password/:token', confirmToken)
// router.post('/forgot-password/:token', newPassword)


// Esto sólo se puede hacer porque acá tenemos dos verbos distintos
// apuntando a un mismo endpoint
router.route('/forgot-password/:token')
   .get(confirmToken)
   .post(newPassword)

module.exports = router;
export {}