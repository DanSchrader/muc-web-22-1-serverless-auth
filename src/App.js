import { Route, Routes, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/Navbar'
import WelcomePage from './pages/WelcomePage'
import { useCallback, useState } from 'react'
import RequirePermission from './components/RequirePermission'
import GitHubRedirect from './pages/GitHubRedirect'

const App = () => {
  const [token, setToken] = useState()
  const navigate = useNavigate()

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

  const loginWithGitHubCode = useCallback(
    async code => {
      const response = await fetch('/api/github-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
      const data = await response.json()
      setToken(data.token)
      navigate('/profile')
    },
    [navigate]
  )

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
        <Route
          path="/oauth/redirect"
          element={<GitHubRedirect onLogin={loginWithGitHubCode} />}
        />
      </Routes>
    </>
  )
}

export default App
