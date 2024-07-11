import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { WorkerContext } from '../context/WorkerContext'


function GuestRouteW() {
    const { worker } = useContext(WorkerContext)

    return (
        worker ? <Navigate to="/wrk/dash" />   : <Outlet />
    )
}

export default GuestRouteW