import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'           // added useNavigate
import PasswordInput from './PasswordInput'
import { useAuth, getNextRoute } from '../../context/AuthContext' // added

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const { login } = useAuth()          // added
  const navigate = useNavigate()       // added

  const validate = () => {
    const e = {}
    if (!email.trim()) e.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Enter a valid email'
    if (!password) e.password = 'Password is required'
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return

    // replaced the console.log with this
    const u = login(email.trim().toLowerCase())
    if (!u) {
      setErrors({ email: 'No account found. Please create an account first.' })
      return
    }
    navigate(getNextRoute(u)) // /profile-setup or /dashboard
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold font-serif text-blue-600 text-center">Welcome Back</h1>
        <p className="mt-2 text-gray-600 text-center">Sign in to continue your journey.</p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-blue-950">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600
                ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            error={errors.password}
          />

          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 font-serif py-2 rounded-xl transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          New to LifePath?{' '}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">Create an account</Link>
        </p>
      </div>
    </section>
  )
}

export default Signin