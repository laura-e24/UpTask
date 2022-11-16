const nodemailer = require('nodemailer')

const registerEmail = async (data) => {
  const { name, email, token } = data;

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9b3e576443faba",
      pass: "e236944af2f96a"
    }
  });

  // Información del email
  const info = await transport.sendMail({
    from: '"UpTask - Admnistrador de proyectos" <cuentas@uptask.com>',
    to: email,
    subject: 'UpTask - Confirmá tu cuenta',
    text: 'Confirmá tu cuenta de UpTask',
    html: `<p>Hola, ${name}. Comprobá tu cuenta en UpTask</p>
    <p>
      Tu cuenta ya está casi lista, sólo tenés que confirmarla en 
      el siguiente enlace: 
      <a href="${process.env.FRONTEND_URL}/confirm/${token}">
        Comprobar cuenta
      </a>
    </p>
    <p>
      Si no creaste esta cuenta, ignorá este mensaje.
    </p>
    `
  })
}

module.exports = registerEmail;
export {}