import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'               // added useNavigate
import PasswordInput from './PasswordInput'
import { useAuth, getNextRoute } from '../../context/AuthContext'  // added

const GetStarted = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [agree, setAgree] = useState(false)
  const [errors, setErrors] = useState({})

  const { register } = useAuth()     // added
  const navigate = useNavigate()     // added

  const handleChange = (field) => (ev) => setForm({ ...form, [field]: ev.target.value })

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 8) e.password = 'Use at least 8 characters'
    else if (!/\d/.test(form.password)) e.password = 'Include at least one number'
    if (!form.confirm) e.confirm = 'Please confirm your password'
    else if (form.confirm !== form.password) e.confirm = 'Passwords do not match'
    if (!agree) e.agree = 'Please accept the terms to continue'
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return

    // replaced the console.log with this
    const u = register({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
    })
    navigate(getNextRoute(u)) // goes to /profile-setup
  }

  return (
    <section className="min-h-screen bg-blue-50 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold font-serif text-blue-600 text-center">Create Your Account</h1>
        <p className="mt-2 text-gray-600 text-center">Start your next chapter with LifePath.</p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-blue-950">Full Name</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={handleChange('name')}
              placeholder="Your name"
              className={`mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600
                ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-blue-950">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              placeholder="you@example.com"
              className={`mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600
                ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          <PasswordInput
            id="password"
            label="Password"
            value={form.password}
            onChange={handleChange('password')}
            placeholder="At least 8 characters"
            error={errors.password}
          />

          <PasswordInput
            id="confirm"
            label="Confirm Password"
            value={form.confirm}
            onChange={handleChange('confirm')}
            placeholder="Type it again"
            error={errors.confirm}
          />

          <div>
            <label className="flex items-start gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1"
              />
              I agree to the terms and privacy policy.
            </label>
            {errors.agree && <p className="mt-1 text-sm text-red-500">{errors.agree}</p>}
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 font-serif py-2 rounded-xl transition-colors"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </section>
  )
}

export default GetStarted