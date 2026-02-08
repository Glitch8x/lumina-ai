import React, { useState } from 'react';
import { BookOpen, Shield, Cpu, TrendingUp, Award, PlayCircle, PenTool, Users, Megaphone, Palette } from 'lucide-react';

const CryptoAcademy = ({ onStartLesson }) => {
    const [filter, setFilter] = useState('all'); // 'all', 'technical', 'non-technical'

    // Color Lookup for Tailwind (Safe-listing)
    const getTheme = (color) => {
        const themes = {
            emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', icon: 'text-emerald-500', bar: 'bg-emerald-500', btnHover: 'hover:bg-emerald-600', iconHover: 'group-hover:bg-emerald-500' },
            amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', icon: 'text-amber-500', bar: 'bg-amber-500', btnHover: 'hover:bg-amber-600', iconHover: 'group-hover:bg-amber-500' },
            cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200', icon: 'text-cyan-500', bar: 'bg-cyan-500', btnHover: 'hover:bg-cyan-600', iconHover: 'group-hover:bg-cyan-500' },
            pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200', icon: 'text-pink-500', bar: 'bg-pink-500', btnHover: 'hover:bg-pink-600', iconHover: 'group-hover:bg-pink-500' },
            violet: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200', icon: 'text-violet-500', bar: 'bg-violet-500', btnHover: 'hover:bg-violet-600', iconHover: 'group-hover:bg-violet-500' },
            blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', icon: 'text-blue-500', bar: 'bg-blue-500', btnHover: 'hover:bg-blue-600', iconHover: 'group-hover:bg-blue-500' },
            fuchsia: { bg: 'bg-fuchsia-50', text: 'text-fuchsia-600', border: 'border-fuchsia-200', icon: 'text-fuchsia-500', bar: 'bg-fuchsia-500', btnHover: 'hover:bg-fuchsia-600', iconHover: 'group-hover:bg-fuchsia-500' },
        };
        return themes[color] || themes.blue;
    };

    const courses = [
        // Technical Courses
        {
            id: 'futures-101',
            title: 'Futures Trading Mastery',
            category: 'technical',
            level: 'Intermediate',
            icon: TrendingUp,
            color: 'emerald',
            description: 'Master leverage, risk management, and technical analysis.',
            modules: [
                'Risk Management Fundamentals',
                'Market Structure & Trends',
                'Entry & Exit Strategies'
            ],
            prompt: 'Teach me Futures Trading Risk Management. Start with Module 1.'
        },
        {
            id: 'defi-safety',
            title: 'DeFi Security & Safety',
            category: 'technical',
            level: 'Beginner',
            icon: Shield,
            color: 'amber',
            description: 'How to avoid scams, secure your wallet, and audit contracts.',
            modules: [
                'Wallet Security 101',
                'Identifying Rug Pulls',
                'Smart Contract Approvals'
            ],
            prompt: 'Teach me DeFi Security. Start with Module 1: Wallet Security.'
        },
        {
            id: 'smart-contracts',
            title: 'Technical Smart Contracts',
            category: 'technical',
            level: 'Advanced',
            icon: Cpu,
            color: 'cyan',
            description: 'Deep dive into EVM, Gas optimization, and Solidity patterns.',
            modules: [
                'EVM Architecture',
                'Gas Optimization',
                'Security Patterns'
            ],
            prompt: 'Teach me Advanced Smart Contract Concepts. Start with Module 1: EVM Architecture.'
        },

        // Non-Technical Courses
        {
            id: 'web3-writing',
            title: 'Web3 Technical Writing',
            category: 'non-technical',
            level: 'Beginner',
            icon: PenTool,
            color: 'pink',
            description: 'Master the art of documentation, whitepapers, and research threads.',
            modules: [
                'Writing Whitepapers',
                'Structuring Documentation',
                'Viral Twitter Threads'
            ],
            prompt: 'Teach me Web3 Technical Writing. Start with Module 1: Anatomy of a Whitepaper.'
        },
        {
            id: 'community-mgmt',
            title: 'Community & Governance',
            category: 'non-technical',
            level: 'Intermediate',
            icon: Users,
            color: 'violet',
            description: 'Learn to build tribes, manage Discords, and lead DAO governance.',
            modules: [
                'Discord Mastery',
                'DAO Proposal Structures',
                'Crisis Management'
            ],
            prompt: 'Teach me Web3 Community Management. Start with Module 1: Discord Setup & Safety.'
        },
        {
            id: 'web3-marketing',
            title: 'Web3 Growth Marketing',
            category: 'non-technical',
            level: 'Intermediate',
            icon: Megaphone,
            color: 'blue',
            description: 'Strategies for user acquisition, Kol partnerships, and narrative building.',
            modules: [
                'Narrative Design',
                'KOL Management',
                'On-chain Analytics for Marketers'
            ],
            prompt: 'Teach me Web3 Marketing Strategies. Start with Module 1: Narrative Design.'
        },
        {
            id: 'nft-design',
            title: 'NFT & Brand Design',
            category: 'non-technical',
            level: 'Beginner',
            icon: Palette,
            color: 'fuchsia',
            description: 'Creating visual assets for collections, branding, and UI/UX basics.',
            modules: [
                'Collection Generative Art',
                'Brand Identity in Web3',
                'Marketplace Aesthetics'
            ],
            prompt: 'Teach me Web3 Design Principles. Start with Module 1: Collection Design.'
        }
    ];

    const filteredCourses = filter === 'all'
        ? courses
        : courses.filter(c => c.category === filter);

    return (
        <div className="flex flex-col h-full bg-slate-50 text-slate-900 overflow-hidden p-6 animated-in">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500 mb-2">
                        Crypto Academy
                    </h2>
                    <p className="text-slate-500">Structured Learning Paths & Certification</p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${filter === 'all' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-100'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('technical')}
                        className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${filter === 'technical' ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-100'}`}
                    >
                        Technical
                    </button>
                    <button
                        onClick={() => setFilter('non-technical')}
                        className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${filter === 'non-technical' ? 'bg-pink-600 border-pink-500 text-white' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-100'}`}
                    >
                        Non-Technical
                    </button>
                </div>
            </div>

            {/* Courses Grid */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-20 pr-2 custom-scrollbar content-start">
                {filteredCourses.map((course) => (
                    <div key={course.id} className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-slate-400 hover:shadow-lg transition-all hover:translate-y-[-4px] shadow-sm flex flex-col h-auto min-h-[320px]">
                        {/* Card Header */}
                        <div className={`h-2 ${getTheme(course.color).bar} w-full`} />
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-xl ${getTheme(course.color).bg} border ${getTheme(course.color).border} flex items-center justify-center ${getTheme(course.color).text} ${getTheme(course.color).iconHover} group-hover:text-white transition-colors`}>
                                    <course.icon size={24} />
                                </div>
                                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded border ${course.category === 'technical' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-pink-200 bg-pink-50 text-pink-700'}`}>
                                    {course.category}
                                </span>
                            </div>

                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-xl text-slate-900">{course.title}</h3>
                                <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-500 h-fit border border-slate-200">{course.level}</span>
                            </div>

                            <p className="text-slate-600 text-sm mb-6 leading-relaxed h-[40px] line-clamp-2">
                                {course.description}
                            </p>

                            <div className="space-y-3 mb-6">
                                {course.modules.slice(0, 2).map((mod, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-slate-500">
                                        <PlayCircle size={14} className={`${getTheme(course.color).icon.replace('text-', 'text-')}`} />
                                        {mod}
                                    </div>
                                ))}
                                {course.modules.length > 2 && <div className="text-xs text-slate-400 pl-6">+ {course.modules.length - 2} more modules</div>}
                            </div>

                            <button
                                onClick={() => onStartLesson(course.prompt)}
                                className={`mt-auto w-full py-3 rounded-xl bg-slate-50 ${getTheme(course.color).btnHover} hover:text-white text-slate-700 font-semibold border border-slate-200 hover:border-transparent transition-all flex items-center justify-center gap-2`}
                            >
                                <BookOpen size={18} /> Start Learning
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute top-6 right-6 flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-full text-sm font-bold border border-amber-200 hidden md:flex">
                <Award size={18} />
                <span>Rank: Novice Scout</span>
            </div>
        </div>
    );
};

export default CryptoAcademy;
