import { Link } from "react-router-dom"

const Login = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Iniciá sesión y administrá tus <span className="text-slate-600">proyectos</span>
      </h1>
      <form className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label 
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input 
            id="email"
            type="email" 
            placeholder="Ingresá tu email..."
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label 
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Contraseña
          </label>
          <input 
            id="password"
            type="password" 
            placeholder="Ingresá tu contraseña..."
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <input 
          type='submit'
          value='Iniciar sesión'
          className="mb-5 w-full bg-sky-700 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to='/register'
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          ¿No tenés una cuenta? Registrate
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

export default Login;