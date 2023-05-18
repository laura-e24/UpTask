import { Link } from "react-router-dom"
import { useState } from "react"
import Alert from "../components/Alert"
import axios from "axios"

const Register = () => {

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  })

  const [alert, setAlert] = useState({
    msg: '',
    error: false
  })
  const { msg } = alert;

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (Object.values(values).includes('')) {
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true
      })

      return;
    }

    if (values.password !== values.repeatPassword) {
      setAlert({
        msg: 'Las contraseñas no coinciden.',
        error: true
      })

      return;
    }

    if (values.password.length < 6) {
      setAlert({
        msg: 'La contraseña debe tener un mínimo de 6 caracteres.',
        error: true
      })

      return;
    }

    setAlert({
      msg: '',
      error: false
    })

    try {
      const API = import.meta.env.VITE_BACKEND_URL;
      const data = {
        name: values.name,
        email: values.email,
        password: values.password,
      }
      const response = await axios.post(`${API}/api/users`, data)
      const { msg } = response.data;
      setAlert({
        msg,
        error: false
      })
      setValues({
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
      })
    } catch (error) {
      const { msg } = error.response.data;
      setAlert({
        msg,
        error: true
      })
    }
  }

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Creá tu cuenta y administrá tus <span className="text-slate-600">proyectos</span>
      </h1>
      {msg && <Alert alert={alert} />}
      <form 
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-lg p-10"
      >
        <div className="my-5">
          <label 
            htmlFor="name"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Nombre
          </label>
          <input 
            value={values.name}
            onChange={handleChange}
            id="name"
            type="text" 
            placeholder="Ingresá tu nombre..."
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label 
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input 
            value={values.email}
            onChange={handleChange}
            id="email"
            type="email" 
            placeholder="Ingresá tu email..."
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label 
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Contraseña
          </label>
          <input 
            value={values.password}
            onChange={handleChange}
            id="password"
            type="password" 
            placeholder="Ingresá tu contraseña..."
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label 
            htmlFor="repeatPassword"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Repetir contraseña
          </label>
          <input 
            value={values.repeatPassword}
            onChange={handleChange}
            id="repeatPassword"
            type="password" 
            placeholder="Repetir contraseña..."
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <input 
          type='submit'
          value='Crear cuenta'
          className="mb-5 w-full bg-sky-700 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to='/'
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          ¿Ya tenés una cuenta? Iniciá sesión
        </Link>
        <Link
          to='/forgot-password'
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          ¿Te olvidaste la contraseña? Recuperala
        </Link>
      </nav>
    </>
  )
}

export default Register;