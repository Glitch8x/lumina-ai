import React from 'react';
import { Sparkles, ArrowRight, Globe, Zap, TrendingUp, Shield, MessageCircle } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 overflow-x-hidden">
            {/* Header */}
            <header className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <img src="/lumina-new-logo.png" alt="Lumina AI Logo" className="w-10 h-10 object-contain" />
                    <span className="font-bold text-xl tracking-tight text-slate-900">Lumina AI</span>
                </div>
                <div className="flex items-center gap-6">
                    <button
                        onClick={onGetStarted}
                        className="bg-slate-900 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-xl shadow-slate-900/10 hover:shadow-blue-600/20"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 relative">
                {/* Tech Grid Background */}
                <div className="absolute inset-0 tech-grid -z-20"></div>

                {/* Reference-style Background Gradient (Warm Beige/Pink to White) */}
                <div className="absolute inset-0 bg-gradient-to-b from-orange-50/40 via-white to-white -z-30"></div>

                {/* Decorative Blurs */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-100/20 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 max-w-6xl mx-auto">
                    Monitor Markets. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c4dff] via-[#448aff] to-[#00bcd4]">Capture Alpha.</span> <br />
                    Repeat Automatically.
                </h1>

                <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                    Lumina AI is your autonomous Web3 scout. Find opportunities, execute trades, and grow your portfolio without the noise.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                    <button
                        onClick={onGetStarted}
                        className="px-8 py-4 bg-gradient-to-r from-[#7c4dff] to-[#00bcd4] hover:opacity-90 text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-500/20 hover:-translate-y-1 transition-all flex items-center gap-2"
                    >
                        Launch Dashboard
                    </button>
                    <button className="px-8 py-4 bg-white/50 border border-slate-200 hover:border-blue-200 text-slate-700 hover:text-blue-600 rounded-xl font-bold text-lg transition-all shadow-sm hover:shadow-md flex items-center gap-2 backdrop-blur-sm">
                        See Documentation
                    </button>
                </div>
            </main>

            {/* Features Grid */}
            <section className="bg-white border-t border-slate-200 py-24 px-8 md:px-12 relative z-10 w-full mb-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-white border border-slate-200 p-10 rounded-3xl hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                            <Globe size={28} className="text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-slate-900">Always-On Monitor</h3>
                        <p className="text-slate-500 leading-relaxed text-lg">
                            Your agent scans X (Twitter) and authentic sources 24/7 for hackathons, bounties, and jobs. Never miss an opportunity.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white border border-slate-200 p-10 rounded-3xl hover:border-red-400/50 hover:shadow-xl hover:shadow-red-500/5 transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                            <Zap size={28} className="text-red-500" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-slate-900">Automation</h3>
                        <p className="text-slate-500 leading-relaxed text-lg">
                            Turn signals into reliable actions. Automate trade execution, bounty submissions, and portfolio tracking.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white border border-slate-200 p-10 rounded-3xl hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                            <TrendingUp size={28} className="text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-slate-900">Smart Insights</h3>
                        <p className="text-slate-500 leading-relaxed text-lg">
                            Intelligent reporting that helps you earn more. Analyze market sentiment and predict trends with Gemini AI.
                        </p>
                    </div>
                </div>

                <div className="text-center mt-24">
                    <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-8">Trusted By Web3 Builders Worldwide</p>
                    <div className="flex items-center justify-center gap-4 opacity-70">
                        <Shield size={24} className="text-slate-300" />
                        <span className="text-slate-400 font-medium">Secured by Gemini Flash</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
