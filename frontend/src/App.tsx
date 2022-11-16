import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import ConfirmAccount from './pages/confirm-account'
import ForgotPassword from './pages/forgot-password'
import Login from './pages/login'
import NewPassword from './pages/new-password'
import Register from './pages/register'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        // Área pública, rutas que todos pueden acceder
        <Route path='/' element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='forgot-password/:token' element={<NewPassword />} />
          <Route path='confirm/:id' element={<ConfirmAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
