import { Navigate } from 'react-router-dom'

const RequirePermission = ({ token, children }) => {
  return token ? children : <Navigate to="/login" />
}

export default RequirePermission
