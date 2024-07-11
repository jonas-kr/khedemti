import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { WorkerContext } from '../context/WorkerContext'


function AuthRoutes() {
    const { worker } = useContext(WorkerContext)

    return (
        worker ? <Outlet /> : <Navigate to="/" />
    )
}

export default AuthRoutes