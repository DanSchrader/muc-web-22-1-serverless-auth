import { useState } from 'react'
import styled from 'styled-components'
import Main from '../components/Main'

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
