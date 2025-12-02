import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../../contexts/AuthContext'

export default function LoginModal({ isOpen, onClose }) {
<<<<<<< HEAD
=======
    const [username, setUsername] = useState('')
>>>>>>> 828ddaa (Added Login page)
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
<<<<<<< HEAD

    if (!isOpen) return null

=======
    const { register } = useAuth()

    if (!isOpen) return null

    const [isRegistering, setIsRegistering] = useState(false)

>>>>>>> 828ddaa (Added Login page)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

<<<<<<< HEAD
        const result = await login(password)

        if (result.success) {
=======
        if (isRegistering) {
            const result = await register(username.trim(), password)
            if (result.success) {
                setUsername('')
                setPassword('')
                setIsRegistering(false)
                onClose()
            } else {
                setError(result.message || 'Registration failed')
            }
            setLoading(false)
            return
        }

        const result = await login(username.trim(), password)

        if (result.success) {
            setUsername('')
>>>>>>> 828ddaa (Added Login page)
            setPassword('')
            onClose()
        } else {
            setError(result.message || 'Login failed')
        }

        setLoading(false)
    }

    const handleClose = () => {
<<<<<<< HEAD
        setPassword('')
        setError('')
=======
        setUsername('')
        setPassword('')
        setError('')
        setIsRegistering(false)
>>>>>>> 828ddaa (Added Login page)
        onClose()
    }

    return (
        <div className="modal-backdrop" onClick={handleClose}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
<<<<<<< HEAD
                    <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
=======
                    <h2 className="text-2xl font-bold text-gray-900">{isRegistering ? 'Register' : 'Login'}</h2>
>>>>>>> 828ddaa (Added Login page)
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close modal"
                    >
                        <XMarkIcon className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
<<<<<<< HEAD
=======
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                            placeholder="Enter username"
                            autoFocus
                            disabled={loading}
                        />
                    </div>

                    <div>
>>>>>>> 828ddaa (Added Login page)
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
<<<<<<< HEAD
                            placeholder="Enter admin password"
                            autoFocus
=======
                            placeholder="Enter password"
>>>>>>> 828ddaa (Added Login page)
                            disabled={loading}
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
<<<<<<< HEAD
                        disabled={loading || !password.trim()}
                        className="w-full py-3 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="mt-4 text-sm text-gray-500 text-center">
                    Login to access admin features like editing and deleting tasks
=======
                        disabled={loading || !password.trim() || !username.trim()}
                        className="w-full py-3 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? (isRegistering ? 'Registering...' : 'Logging in...') : (isRegistering ? 'Register' : 'Login')}
                    </button>

                    <div className="mt-2 text-center">
                        <button
                            type="button"
                            onClick={() => { setIsRegistering(!isRegistering); setError('') }}
                            className="text-sm text-sky-600 hover:underline"
                        >
                            {isRegistering ? 'Back to Login' : "Don't have an account? Register"}
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-sm text-gray-500 text-center">
                    {isRegistering
                        ? 'Register a local demo account (client-only). Server-side auth is still required for admin-protected API calls.'
                        : 'Login to access admin features like editing and deleting tasks'}
>>>>>>> 828ddaa (Added Login page)
                </p>
            </div>
        </div>
    )
}
