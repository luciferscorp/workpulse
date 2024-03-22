import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoutes() {
    let isAuthenticated = false

    return (
        isAuthenticated != true ? <Navigate to="login" /> : <Outlet />
    )
}

export default ProtectedRoutes;