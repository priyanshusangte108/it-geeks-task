import {Navigate} from 'react-router-dom';

const PrivateRoute = ({children}) => {
  const token = localStorage.getItem('token')
  console.log("token",token);

  return token == null ? < Navigate to = "/login" replace/>: children
}

export default PrivateRoute ;