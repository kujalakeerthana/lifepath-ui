import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const PasswordInput = ({ id, label, value, onChange, error, placeholder }) => {
  const [show, setShow] = useState(false)

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-blue-950">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-xl border px-4 py-2 pr-12 outline-none focus:ring-2 focus:ring-blue-600
            ${error ? 'border-red-500' : 'border-gray-300'}`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default PasswordInput