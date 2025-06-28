import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Footer from './Footer'

const MainLayout = () => {
    return (
        <div className="d-flex" style={{ minHeight: '100vh' }}>
            <Sidebar />
            <div className="content flex-grow-1 d-flex flex-column">
                <Topbar />
                <main className="flex-grow-1">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default MainLayout
