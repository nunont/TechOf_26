
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { AuthProvider } from './context/AuthContext'
import Landing from './pages/Landing'
import PrivateRoute from './components/PrivateRoute'
import RequestResetPassword from './pages/RequestResetPassword'
import ResetPassword from './pages/ResetPassword'

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/requestPassword' element={<RequestResetPassword />} />
        <Route path='/resetPassword' element={<ResetPassword />} />

        <Route element={<PrivateRoute/>}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
    
  )
}

export default App
