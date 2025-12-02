import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        setLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Failed to login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Login Form */}
            <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white">
                <div className="w-full max-w-md animate-slide-up">
                    {/* Logo/Title */}
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold mb-2 font-['Outfit'] bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                            90-Day Roadmap
                        </h1>
                        <p className="text-gray-600 text-sm">Welcome back! Please login to your account.</p>
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

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all duration-300 text-gray-900"
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all duration-300 text-gray-900"
                                placeholder="Enter your password"
                                disabled={loading}
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500" />
                                <span className="text-gray-600">Remember Me</span>
                            </label>
                            <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">Forgot Password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold py-3.5 rounded-lg hover:shadow-lg hover:shadow-teal-500/30 focus:ring-4 focus:ring-teal-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Logging in...
                                </span>
                            ) : 'Login'}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link
                                to="/register"
                                className="text-teal-600 hover:text-teal-700 font-bold hover:underline transition-all"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Illustration/Brand */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 items-center justify-center p-12 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
                    <div className="absolute bottom-20 right-20 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center max-w-lg">
                    <div className="mb-8">
                        <div className="inline-block p-4 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
                            <svg className="w-20 h-20 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-4xl font-bold text-white mb-4 font-['Outfit']">
                        Track Your Progress
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Master Full-Stack Development, DevOps & AI Engineering in just 90 days with our comprehensive roadmap.
                    </p>

                    {/* Feature Pills */}
                    <div className="mt-10 flex flex-wrap gap-3 justify-center">
                        <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-teal-300 text-sm font-medium">
                            ✨ Interactive Tasks
                        </span>
                        <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-orange-300 text-sm font-medium">
                            📊 Progress Tracking
                        </span>
                        <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-cyan-300 text-sm font-medium">
                            ☁️ Cloud Sync
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
