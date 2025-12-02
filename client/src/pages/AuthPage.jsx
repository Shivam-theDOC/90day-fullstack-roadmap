import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AuthPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialTab = searchParams.get('tab') || 'login';
    const [activeTab, setActiveTab] = useState(initialTab);

    // Login state
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);

    // Register state
    const [name, setName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [registerLoading, setRegisterLoading] = useState(false);

    const { login, register } = useAuth();
    const navigate = useNavigate();

    const switchTab = (tab) => {
        setActiveTab(tab);
        setSearchParams({ tab });
        setLoginError('');
        setRegisterError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');

        if (!loginEmail || !loginPassword) {
            setLoginError('Please enter both email and password');
            return;
        }

        setLoginLoading(true);
        try {
            await login(loginEmail, loginPassword);
            navigate('/');
        } catch (err) {
            setLoginError(err.message || 'Failed to login. Please try again.');
        } finally {
            setLoginLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegisterError('');

        if (!name || !registerEmail || !registerPassword || !confirmPassword) {
            setRegisterError('Please fill in all fields');
            return;
        }

        if (registerPassword !== confirmPassword) {
            setRegisterError('Passwords do not match');
            return;
        }

        if (registerPassword.length < 6) {
            setRegisterError('Password must be at least 6 characters long');
            return;
        }

        setRegisterLoading(true);
        try {
            await register(name, registerEmail, registerPassword);
            navigate('/');
        } catch (err) {
            setRegisterError(err.message || 'Failed to register. Please try again.');
        } finally {
            setRegisterLoading(false);
        }
    };

    const getPasswordStrength = () => {
        if (!registerPassword) return null;
        if (registerPassword.length < 6) return { text: 'Weak', color: 'bg-orange-500', width: '33%' };
        if (registerPassword.length < 10) return { text: 'Medium', color: 'bg-yellow-500', width: '66%' };
        return { text: 'Strong', color: 'bg-teal-500', width: '100%' };
    };

    const strength = getPasswordStrength();

    return (
        <div className="container-full">
            {/* Left Side - Forms with Glassmorphism */}
            <div className="flex-1 flex-center px-8 py-12 bg-gradient-pastel">
                {/* Animated gradient orbs */}
                <div className="absolute-fill">
                    <div className="orb orb-blue"></div>
                    <div className="orb orb-purple"></div>
                    <div className="orb orb-violet"></div>
                </div>

                {/* Glassmorphic Form Card */}
                <div className="form-container">
                    <div className="card-glass-auth">
                        {/* Logo/Title */}
                        <div className="mb-8 text-center">
                            <h1 className="title-gradient">
                                90-Day Roadmap
                            </h1>
                            <p className="subtitle-text">Your journey to DevOps & AI Engineering</p>
                        </div>

                        {/* Tab Switcher with Glassmorphism */}
                        <div className="tab-container">
                            <button
                                onClick={() => switchTab('login')}
                                className={activeTab === 'login' ? 'btn-tab-active' : 'btn-tab'}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => switchTab('register')}
                                className={activeTab === 'register' ? 'btn-tab-active' : 'btn-tab'}
                            >
                                Register
                            </button>
                        </div>

                        {/* Forms Container with Sliding Animation */}
                        <div className="form-slider">
                            <div
                                className="form-slide-wrapper"
                                style={{ transform: activeTab === 'login' ? 'translateX(0)' : 'translateX(-100%)' }}
                            >
                                {/* Login Form */}
                                <div className="form-panel">
                                    {loginError && (
                                        <div className="alert-error">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                                <p className="text-orange-700 text-sm font-medium">{loginError}</p>
                                            </div>
                                        </div>
                                    )}

                                    <form onSubmit={handleLogin} className="space-y-5">
                                        <div>
                                            <label htmlFor="login-email" className="input-label">
                                                Email
                                            </label>
                                            <input
                                                id="login-email"
                                                type="email"
                                                value={loginEmail}
                                                onChange={(e) => setLoginEmail(e.target.value)}
                                                className="input-glass"
                                                placeholder="Enter your email"
                                                disabled={loginLoading}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="login-password" className="input-label">
                                                Password
                                            </label>
                                            <input
                                                id="login-password"
                                                type="password"
                                                value={loginPassword}
                                                onChange={(e) => setLoginPassword(e.target.value)}
                                                className="input-glass"
                                                placeholder="Enter your password"
                                                disabled={loginLoading}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between text-sm">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500" />
                                                <span className="text-gray-700 font-medium">Remember Me</span>
                                            </label>
                                            <a href="#" className="link-teal">Forgot Password?</a>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loginLoading}
                                            className="btn-primary"
                                        >
                                            {loginLoading ? (
                                                <span className="flex-center gap-2">
                                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Logging in...
                                                </span>
                                            ) : 'Login'}
                                        </button>
                                    </form>
                                </div>

                                {/* Register Form */}
                                <div className="form-panel-offset">
                                    {registerError && (
                                        <div className="alert-error">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                                <p className="text-orange-700 text-sm font-medium">{registerError}</p>
                                            </div>
                                        </div>
                                    )}

                                    <form onSubmit={handleRegister} className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="input-label">
                                                Full Name
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="input-glass"
                                                placeholder="Enter your full name"
                                                disabled={registerLoading}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="register-email" className="input-label">
                                                Email
                                            </label>
                                            <input
                                                id="register-email"
                                                type="email"
                                                value={registerEmail}
                                                onChange={(e) => setRegisterEmail(e.target.value)}
                                                className="input-glass"
                                                placeholder="Enter your email"
                                                disabled={registerLoading}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="register-password" className="input-label">
                                                Password
                                            </label>
                                            <input
                                                id="register-password"
                                                type="password"
                                                value={registerPassword}
                                                onChange={(e) => setRegisterPassword(e.target.value)}
                                                className="input-glass"
                                                placeholder="Create a password"
                                                disabled={registerLoading}
                                            />
                                            {strength && (
                                                <div className="password-strength">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-xs font-medium text-gray-600">Password Strength</span>
                                                        <span className="text-xs font-semibold text-gray-700">{strength.text}</span>
                                                    </div>
                                                    <div className="password-strength-bg">
                                                        <div
                                                            className={`password-strength-fill ${strength.color}`}
                                                            style={{ width: strength.width }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="confirm-password" className="input-label">
                                                Confirm Password
                                            </label>
                                            <input
                                                id="confirm-password"
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="input-glass"
                                                placeholder="Confirm your password"
                                                disabled={registerLoading}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={registerLoading}
                                            className="btn-primary"
                                        >
                                            {registerLoading ? (
                                                <span className="flex-center gap-2">
                                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Creating Account...
                                                </span>
                                            ) : 'Create Account'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Static Illustration/Brand */}
            <div className="hidden lg:flex flex-1 bg-gradient-dark items-center justify-center p-12 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute-fill">
                    <div className="orb-teal"></div>
                    <div className="orb-orange"></div>
                    <div className="orb-cyan"></div>
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

                    <h2 className="title-gradient text-white">
                        Track Your Progress
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                        Master Full-Stack Development, DevOps & AI Engineering in just 90 days with our comprehensive roadmap.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
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

                    {/* Feature Pills */}
                    <div className="flex flex-wrap gap-3 justify-center">
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
