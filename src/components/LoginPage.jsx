import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Eye, EyeOff, Mail, Lock, Loader2, AlertCircle, CheckCircle2, Zap, Shield, Hexagon } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
    const [mode, setMode] = useState('login'); // 'login', 'signup', 'forgot'
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [glitchActive, setGlitchActive] = useState(false);

    // Trigger glitch effect on mount
    useEffect(() => {
        const interval = setInterval(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 200);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            if (mode === 'signup') {
                if (formData.password !== formData.confirmPassword) throw new Error("Passwords do not match");

                const { data, error } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                });
                if (error) throw error;
                setSuccess('Access Protocol Initiated. Check your neural feed (email) for verification.');
            } else if (mode === 'login') {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                });
                if (error) throw error;
                setSuccess('Neural Link Established.');
                setTimeout(() => onLogin(), 800);
            } else if (mode === 'forgot') {
                const { error } = await supabase.auth.resetPasswordForEmail(formData.email);
                if (error) throw error;
                setSuccess('Password reset signal sent.');
                setTimeout(() => setMode('login'), 3000);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
            if (error) throw error;
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] relative flex items-center justify-center p-4 overflow-hidden font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
            {/* Ambient Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            {/* Main Card */}
            <div className={`relative w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl transition-all duration-300 ${glitchActive ? 'translate-x-[2px] shadow-cyan-500/20' : ''}`}>

                {/* Decorative Border Glow */}
                <div className="absolute inset-0 rounded-3xl ring-1 ring-white/5 pointer-events-none"></div>
                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 opacity-50 blur-sm -z-10"></div>

                {/* Header Section */}
                <div className="text-center mb-10 relative">
                    <div className="w-20 h-20 mx-auto mb-6 relative group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                        <div className="relative w-full h-full bg-black/80 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden">
                            <Hexagon className="text-white w-10 h-10 animate-spin-slow duration-[10s]" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent"></div>
                        </div>
                    </div>

                    <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tighter mb-2 font-display">
                        LUMINA<span className="text-cyan-500">.</span>AI
                    </h1>
                    <p className="text-slate-400 text-sm font-medium tracking-wide uppercase opacity-80">
                        {mode === 'login' ? 'Authentication Required' : mode === 'signup' ? 'Initialize Protocol' : 'Recovery Mode'}
                    </p>
                </div>

                {/* Feedback Messages */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 animate-in slide-in-from-top-2">
                        <AlertCircle className="text-red-400 shrink-0" size={20} />
                        <p className="text-sm text-red-200 font-medium">{error}</p>
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-start gap-3 animate-in slide-in-from-top-2">
                        <CheckCircle2 className="text-green-400 shrink-0" size={20} />
                        <p className="text-sm text-green-200 font-medium">{success}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Identity</label>
                        <div className="relative group">
                            <input
                                required
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 focus:ring-4 focus:ring-cyan-500/10 transition-all font-medium"
                                placeholder="name@domain.com"
                            />
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                        </div>
                    </div>

                    {mode !== 'forgot' && (
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Passcode</label>
                            <div className="relative group">
                                <input
                                    required
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pl-11 pr-11 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 focus:ring-4 focus:ring-cyan-500/10 transition-all font-medium"
                                    placeholder="••••••••"
                                />
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    )}

                    {mode === 'signup' && (
                        <div className="space-y-1.5 animate-in slide-in-from-top-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Verify Passcode</label>
                            <div className="relative group">
                                <input
                                    required
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 focus:ring-4 focus:ring-cyan-500/10 transition-all font-medium"
                                    placeholder="••••••••"
                                />
                                <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                            </div>
                        </div>
                    )}

                    {mode === 'login' && (
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setMode('forgot')}
                                className="text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
                            >
                                Forgot Passcode?
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full group relative py-3.5 px-4 overflow-hidden rounded-xl bg-slate-100 text-black font-bold text-sm tracking-wide transition-all hover:bg-cyan-400 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                    >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" />
                        <div className="flex items-center justify-center gap-2">
                            {loading ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} className="text-inherit" />}
                            <span>{mode === 'signup' ? 'ESTABLISH LINK' : mode === 'forgot' ? 'SEND SIGNAL' : 'CONNECT TERMINAL'}</span>
                        </div>
                    </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Or access via</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                {/* Social Login */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-300 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 opacity-90" />
                    <span>Continue with Google</span>
                </button>

                {/* Footer Switcher */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500">
                        {mode === 'login' ? 'New to the network?' : 'Already connected?'}
                        <button
                            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                            className="ml-2 font-bold text-slate-300 hover:text-cyan-400 transition-colors underline decoration-slate-700 underline-offset-4"
                        >
                            {mode === 'login' ? 'Initialize' : 'Log In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
