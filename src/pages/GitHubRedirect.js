import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const GitHubRedirect = ({ onLogin }) => {
  const location = useLocation()

  const search = location.search

  const query = new URLSearchParams(search)

  const code = query.get('code')

  useEffect(() => {
    if (!code) {
      return
    }
    onLogin(code)
  }, [code, onLogin])

  return null
}

export default GitHubRedirect
