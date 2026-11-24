import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-20 py-6 bg-white">

      <Link to="/" className="text-2xl font-bold text-blue-600">
        LifePath
      </Link>

      <div className="flex items-center gap-8 text-gray-600 font-medium">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>

        <Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>

        <Link to="/explore" className="hover:text-blue-600 transition-colors">Explore</Link>

        <Link to="/how-it-works" className="hover:text-blue-600 transition-colors">How it works</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/signin" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
          Sign In
        </Link>

        <Link
          to="/GetStarted"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Get Started
        </Link>
      </div>

    </nav>
  )
}

export default Navbar
