import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Navbar = ({ token, onLogout }) => {
  return (
    <Nav>
      <NavLink to="/">Welcome</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      {token ? (
        <button onClick={onLogout}>logout</button>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </Nav>
  )
}

const Nav = styled.nav`
  display: flex;
  padding: 24px;
  background: tomato;
  justify-content: space-evenly;

  a {
    color: white;
    text-decoration: none;
    border-bottom: 2px solid transparent;
  }

  a.active {
    border-color: white;
  }
`

export default Navbar
