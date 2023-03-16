import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../containers/authentication/Login'
import Register from '../containers/authentication/Register'
import Chat from '../containers/Chat'
import { PrivateRoute } from './PrivateRoute'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route
                path="/chat"
                element={
                    <PrivateRoute>
                        <Chat/>
                    </PrivateRoute>
                }
            />
        </Routes>
    )
}

export default AppRoutes