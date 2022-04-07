import { Route, Routes, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/Navbar'
import WelcomePage from './pages/WelcomePage'
import { useEffect, useState } from 'react'
import RequirePermission from './components/RequirePermission'

const App = () => {
  const [token, setToken] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    console.log({ token })
  }, [token])

  const loginWithNameAndPassword = async credentials => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    const data = await response.json()
    setToken(data.token)
    navigate('/profile')
  }

  const logout = () => setToken()

  return (
    <>
      <Navbar token={token} onLogout={logout} />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/login"
          element={<LoginPage onLogin={loginWithNameAndPassword} />}
        />
        <Route
          path="/profile"
          element={
            <RequirePermission token={token}>
              <ProfilePage token={token} />
            </RequirePermission>
          }
        />
      </Routes>
    </>
  )
}

export default App
