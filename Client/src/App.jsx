import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import Navigation from './components/layout/Navigation'
import Home from './pages/Home'
import About from './pages/About'
import Analytics from './pages/Analytics'
import History from './pages/History'
import NavDashboard from './components/dashboard/NavDashboard'
import Login from './pages/loginPage'
import Signup from './pages/signupPage'
import ProfileNav from './components/profile/ProfileNavigation'
import Profile from './pages/settings/Profile'
import Security from './pages/settings/Security'
function App() {
  return (
    <div>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard */}
        <Route path="/dashboard/*" element={<NavDashboard />}>
          <Route path="analytics" element={<Analytics />} />
          <Route path="history" element={<History />} />
        </Route>
        {/* settings */}
        <Route path="/settings/*" element={<ProfileNav/>}>
          <Route path="profile" element={<Profile />} />
          <Route path="security" element={<Security />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
