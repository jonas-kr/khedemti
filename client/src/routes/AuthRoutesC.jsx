import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { CompanyContext } from '../context/CompanyContext'


function AuthRoutesC() {
    const { company } = useContext(CompanyContext)
    return (
        company ? <Outlet /> : <Navigate to="/" />
    )
}

export default AuthRoutesC