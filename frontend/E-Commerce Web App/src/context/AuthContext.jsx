import { createContext } from "react"

const AuthContext = createContext();

const AuthProvider = ({Children}) => {
  return (
   <AuthContext.Provider>
    {Children}
   </AuthContext.Provider>
  )
}
 export default AuthProvider