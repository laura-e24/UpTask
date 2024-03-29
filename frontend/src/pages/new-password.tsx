const NewPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Restablecé tu contraseña y 
        no pierdas acceso a tus <span className="text-slate-600">proyectos</span>
      </h1>
      <form className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label 
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Nueva contraseña
          </label>
          <input 
            id="password"
            type="password" 
            placeholder="Ingresá tu nueva contraseña..."
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <input 
          type='submit'
          value='Guardar nueva contraseña'
          className="mb-5 w-full bg-sky-700 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
    </>
  )
}

export default NewPassword;