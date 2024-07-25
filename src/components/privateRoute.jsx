import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../redux/slices/authSlice'


function PrivateRoute({children}) {

    const connected = useSelector(isAuthenticated)
    console.log('Private route ......')
    
  return (
    connected ? children : <Navigate to={'/security/login'} replace />
  )
}

export default PrivateRoute