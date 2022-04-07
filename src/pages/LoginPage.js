import { useState } from 'react'
import styled from 'styled-components'
import Main from '../components/Main'

const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID

const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`

const initialCredentials = {
  name: '',
  password: '',
}

const LoginPage = ({ onLogin }) => {
  const [credentials, setCredentials] = useState(initialCredentials)

  const handleChange = event => {
    const { name, value } = event.target
    setCredentials({ ...credentials, [name]: value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    onLogin(credentials)
  }

  return (
    <Main>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            name="name"
            value={credentials.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </label>
        <button>Login</button>
      </Form>
      <a href={githubLoginUrl}>Login with github</a>
    </Main>
  )
}

const Form = styled.form`
  display: grid;
  justify-content: start;
  gap: 12px;

  input {
    display: block;
  }
`

export default LoginPage
