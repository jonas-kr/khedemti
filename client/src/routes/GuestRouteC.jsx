import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { CompanyContext } from '../context/CompanyContext'


function GuestRouteC() {
    const { company } = useContext(CompanyContext)

    return (
        company ? <Navigate to="/emp/dash" />  : <Outlet />
    )
}

export default GuestRouteC