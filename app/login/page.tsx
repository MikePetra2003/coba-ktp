'use client' // 1. Tambahkan ini agar jadi Client Component

import { login, signup } from '@/app/auth/action'
import { useState } from 'react'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 2. Wrapper function untuk Login
  const handleLogin = async (formData: FormData) => {
    setLoading(true)
    setError(null)
    
    // Panggil server action
    const result = await login(formData)
    
    // Jika ada return value (berarti error), set state error
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
    // Jika sukses, redirect akan ditangani oleh server action (app/auth/actions.ts)
  }

  // 3. Wrapper function untuk Signup
  const handleSignup = async (formData: FormData) => {
    setLoading(true)
    setError(null)

    const result = await signup(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center text-gray-900">Masuk atau Daftar</h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900" 
            />
          </div>

          {/* Menampilkan Error jika ada */}
          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            {/* 4. Gunakan wrapper function pada formAction */}
            <button 
              formAction={handleLogin} 
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Login'}
            </button>
            
            <button 
              formAction={handleSignup} 
              disabled={loading}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
