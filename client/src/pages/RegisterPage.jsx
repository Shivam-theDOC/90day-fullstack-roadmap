import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setLoading(true);
        try {
            await register(name, email, password);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Failed to register. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getPasswordStrength = () => {
        if (!password) return null;
        if (password.length < 6) return { text: 'Weak', color: 'bg-orange-500', width: '33%' };
        if (password.length < 10) return { text: 'Medium', color: 'bg-yellow-500', width: '66%' };
        return { text: 'Strong', color: 'bg-teal-500', width: '100%' };
    };

    const strength = getPasswordStrength();

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Registration Form */}
            <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white">
                <div className="w-full max-w-md animate-slide-up">
                    {/* Logo/Title */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-2 font-['Outfit'] bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                            Get Started
                        </h1>
                        <p className="text-gray-600 text-sm">Create your account to begin your 90-day journey.</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r animate-scale">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p className="text-orange-700 text-sm font-medium">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-300 text-gray-900"
                                placeholder="Enter your full name"
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-300 text-gray-900"
                                placeholder="Enter your email"
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-300 text-gray-900"
                                placeholder="Create a password"
                                disabled={loading}
                            />
                            {strength && (
                                <div className="mt-3">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-medium text-gray-600">Password Strength</span>
                                        <span className="text-xs font-semibold text-gray-700">{strength.text}</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${strength.color} transition-all duration-500 rounded-full`}
                                            style={{ width: strength.width }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-300 text-gray-900"
                                placeholder="Confirm your password"
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold py-3.5 rounded-lg hover:shadow-lg hover:shadow-orange-500/30 focus:ring-4 focus:ring-orange-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </span>
                            ) : 'Create Account'}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-orange-600 hover:text-orange-700 font-bold hover:underline transition-all"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Illustration/Brand */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 items-center justify-center p-12 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 right-20 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
                    <div className="absolute bottom-20 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center max-w-lg">
                    <div className="mb-8">
                        <div className="inline-block p-4 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
                            <svg className="w-20 h-20 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-4xl font-bold text-white mb-4 font-['Outfit']">
                        Start Your Journey
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Join thousands of developers mastering Full-Stack, DevOps & AI Engineering with our proven 90-day roadmap.
                    </p>

                    {/* Stats */}
                    <div className="mt-10 grid grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-teal-400 mb-1">90</div>
                            <div className="text-gray-400 text-sm">Days</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-400 mb-1">137</div>
                            <div className="text-gray-400 text-sm">Tasks</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-cyan-400 mb-1">3</div>
                            <div className="text-gray-400 text-sm">Domains</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
