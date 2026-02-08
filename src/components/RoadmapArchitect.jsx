import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Code, Users, Terminal, Shield, Cpu, Megaphone, PenTool } from 'lucide-react';
import { roadmaps } from '../data/roadmaps';

const RoadmapArchitect = ({ onGenerateRoadmap }) => {
    const [selectedRoadmap, setSelectedRoadmap] = useState(null);

    // --- Components ---

    // Color Lookup for Tailwind (Safe-listing)
    const getTheme = (color) => {
        const themes = {
            blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', icon: 'text-blue-500', bar: 'bg-blue-500' },
            violet: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200', icon: 'text-violet-500', bar: 'bg-violet-500' },
            emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', icon: 'text-emerald-500', bar: 'bg-emerald-500' },
            slate: { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', icon: 'text-slate-500', bar: 'bg-slate-500' },
            cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200', icon: 'text-cyan-500', bar: 'bg-cyan-500' },
            orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', icon: 'text-orange-500', bar: 'bg-orange-500' },
            pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200', icon: 'text-pink-500', bar: 'bg-pink-500' },
            indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', icon: 'text-indigo-500', bar: 'bg-indigo-500' },
            teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', icon: 'text-teal-500', bar: 'bg-teal-500' },
            red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', icon: 'text-red-500', bar: 'bg-red-500' },
            fuchsia: { bg: 'bg-fuchsia-50', text: 'text-fuchsia-600', border: 'border-fuchsia-200', icon: 'text-fuchsia-500', bar: 'bg-fuchsia-500' },
            purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', icon: 'text-purple-500', bar: 'bg-purple-500' },
            green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', icon: 'text-green-500', bar: 'bg-green-500' },
            amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', icon: 'text-amber-500', bar: 'bg-amber-500' },
            yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200', icon: 'text-yellow-500', bar: 'bg-yellow-500' },
        };
        return themes[color] || themes.blue;
    };

    const Directory = () => {
        const [activeTab, setActiveTab] = useState('technical');

        return (
            <div className="animate-in fade-in zoom-in-95 duration-500 h-full flex flex-col">
                <div className="text-center mb-8 shrink-0">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-600">
                        Developer & Career Roadmaps
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg mb-8">
                        Step-by-step guides and paths to learn different tools or technologies.
                    </p>

                    {/* Tabs */}
                    <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                        <button
                            onClick={() => setActiveTab('technical')}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'technical'
                                ? 'bg-white text-blue-600 shadow-sm border border-slate-200'
                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
                                }`}
                        >
                            <Code size={16} /> Technical Roles
                        </button>
                        <button
                            onClick={() => setActiveTab('nonTechnical')}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'nonTechnical'
                                ? 'bg-white text-rose-600 shadow-sm border border-slate-200'
                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
                                }`}
                        >
                            <Users size={16} /> Non-Technical Roles
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-20">
                    {/* Technical Section */}
                    {activeTab === 'technical' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                                {roadmaps.technical.map(role => (
                                    <div
                                        key={role.id}
                                        onClick={() => setSelectedRoadmap(role)}
                                        className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 cursor-pointer transition-all hover:-translate-y-1 relative overflow-hidden h-auto min-h-[220px] flex flex-col"
                                    >
                                        <div className={`absolute top-0 left-0 w-1 h-full ${getTheme(role.color).bar} opacity-0 group-hover:opacity-100 transition-opacity`} />
                                        <div className="flex items-start justify-between mb-4">
                                            <role.icon className={`${getTheme(role.color).icon} group-hover:scale-110 transition-transform`} size={32} />
                                            <span className="text-[10px] text-slate-500 border border-slate-200 bg-slate-50 px-2 py-1 rounded-full">{role.steps.reduce((acc, s) => acc + s.topics.length, 0)} Topics</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{role.title}</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{role.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Non-Technical Section */}
                    {activeTab === 'nonTechnical' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                                {roadmaps.nonTechnical.map(role => (
                                    <div
                                        key={role.id}
                                        onClick={() => setSelectedRoadmap(role)}
                                        className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-rose-500/50 hover:shadow-lg hover:shadow-rose-500/5 cursor-pointer transition-all hover:-translate-y-1 relative overflow-hidden h-auto min-h-[220px] flex flex-col"
                                    >
                                        <div className={`absolute top-0 left-0 w-1 h-full ${getTheme(role.color).bar} opacity-0 group-hover:opacity-100 transition-opacity`} />
                                        <div className="flex items-start justify-between mb-4">
                                            <role.icon className={`${getTheme(role.color).icon} group-hover:scale-110 transition-transform`} size={32} />
                                            <span className="text-[10px] text-slate-500 border border-slate-200 bg-slate-50 px-2 py-1 rounded-full">{role.steps.reduce((acc, s) => acc + s.topics.length, 0)} Topics</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{role.title}</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{role.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const RoadmapVisualizer = ({ roadmap }) => (
        <div className="animate-in slide-in-from-right-10 duration-500 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8 border-b border-slate-200 pb-6 sticky top-0 bg-slate-50/90 backdrop-blur-md z-10 pt-2">
                <button
                    onClick={() => setSelectedRoadmap(null)}
                    className="p-2 rounded-full hover:bg-slate-200 transition-colors text-slate-600"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900">
                        {roadmap.title}
                        <span className={`text-xs px-2 py-1 rounded ${getTheme(roadmap.color).bg} ${getTheme(roadmap.color).text} border ${getTheme(roadmap.color).border}`}>
                            Career Path
                        </span>
                    </h2>
                    <p className="text-slate-500 text-sm">Follow this path to master the craft.</p>
                </div>
            </div>

            {/* Timeline/Flowchart */}
            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar pb-20">
                <div className="relative max-w-3xl mx-auto pl-8">
                    {/* Vertical Line */}
                    <div className="absolute left-[29px] top-4 bottom-0 w-1 bg-gradient-to-b from-slate-300 to-transparent rounded-full"></div>

                    {roadmap.steps.map((step, index) => (
                        <div key={index} className="relative mb-12 group">
                            {/* Dot */}
                            <div className={`absolute -left-[37px] w-8 h-8 rounded-full bg-white border-4 ${getTheme(roadmap.color).border.replace('border-', 'border-').replace('200', '500')} z-10 flex items-center justify-center shadow-md`}>
                                <div className={`w-2 h-2 rounded-full ${getTheme(roadmap.color).bar}`}></div>
                            </div>

                            {/* Content Card */}
                            <div className="ml-6 bg-white p-6 rounded-xl border border-slate-200 relative hover:border-blue-300 hover:shadow-md transition-all">
                                {/* Connector Line (Horizontal) */}
                                <div className="absolute top-8 -left-6 w-6 h-[2px] bg-slate-300"></div>

                                <h3 className="text-lg font-bold text-slate-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                                    <span className={`${getTheme(roadmap.color).text} font-extrabold`}>0{index + 1}</span> {step.phase}
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {step.topics.map((topic, tIndex) => (
                                        <button
                                            key={tIndex}
                                            onClick={() => onGenerateRoadmap(`Explain the concept of "${topic}" in the context of a ${roadmap.title}. Provide resources and a mini-quiz.`)}
                                            className="text-left px-4 py-3 rounded-lg bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all flex items-center justify-between group/btn"
                                        >
                                            <span className="text-slate-600 text-sm group-hover/btn:text-blue-700">{topic}</span>
                                            <CheckCircle size={14} className="text-slate-300 group-hover/btn:text-blue-500 transition-colors" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* End Node */}
                    <div className="relative mb-12 pl-6">
                        <div className="p-8 rounded-2xl border-2 border-dashed border-slate-300 text-center">
                            <h3 className="text-xl font-bold text-slate-400">Mastery Achieved</h3>
                            <p className="text-sm text-slate-500">You have completed the path.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-slate-50 text-slate-900 overflow-hidden p-6 animated-in">
            {!selectedRoadmap ? <Directory /> : <RoadmapVisualizer roadmap={selectedRoadmap} />}
        </div>
    );
};

export default RoadmapArchitect;
