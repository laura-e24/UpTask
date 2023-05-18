import { Link } from "react-router-dom"

const ForgotPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Recuperá el acceso y 
        no pierdas tus <span className="text-slate-600">proyectos</span>
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
        <input 
          type='submit'
          value='Recuperar acceso'
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
          to='/register'
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          ¿No tenés una cuenta? Registrate
        </Link>
      </nav>
    </>
  )
}

export default ForgotPassword;