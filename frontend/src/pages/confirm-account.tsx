import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Alert from '../components/Alert'

const ConfirmAccount = () => {

  const params = useParams();
  const { token } = params;
  
  const [alert, setAlert] = useState({
    msg: '',
    error: false
  })

  const [confirmedAccount, setConfirmedAccount] = useState(false)

  const { msg } = alert;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const API = `http://localhost:4000/api/users/confirm/${token}`
        const { data } = await axios(API)

        setAlert({
          msg: data.msg,
          error: false
        })
        setConfirmedAccount(true)
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
        throw new Error(error.response.data.msg)
      }
    }
    return () => {confirmAccount()}
  }, [])

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirmá tu contraseña y 
        comenzá a crear tus <span className="text-slate-600">proyectos</span>
      </h1>
      <div className='mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alert alert={alert} />}
        {confirmedAccount && (
          <Link
            to='/login'
            className="block text-center my-5 text-slate-500 uppercase text-sm"
          >
            Iniciá sesión
          </Link>
        )}
      </div>
    </>
  )
}

export default ConfirmAccount;