import React, { useEffect, useState } from 'react';
import { opportunityManager } from '../services/opportunityManager';
import { Shield, ExternalLink, Activity, Radio, RefreshCcw, Sparkles } from 'lucide-react';

const OpportunityFeed = ({ onClose }) => {
    const [opportunities, setOpportunities] = useState([]);

    useEffect(() => {
        // Start monitoring when component mounts
        opportunityManager.startMonitoring();

        // Subscribe to updates
        const unsubscribe = opportunityManager.subscribe((data) => {
            setOpportunities(data);
        });

        return () => {
            // Cleanup
            unsubscribe();
            // Optional: Stop monitoring if no one else is listening, 
            // but for now we might want to keep it running or stop it to save resources.
            opportunityManager.stopMonitoring();
        };
    }, []);

    return (
        <div className="flex flex-col h-full bg-slate-50 text-slate-900 overflow-hidden font-sans">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-red-500 flex items-center justify-center shadow-lg shadow-blue-500/20 animate-pulse">
                        <Radio size={18} className="text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-xl tracking-tight text-slate-900">Live Opportunities</h2>
                        <div className="flex items-center gap-2 text-xs text-blue-600 font-medium">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                            Verified Real-World Intelligence Stream
                        </div>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 hover:text-slate-900 font-bold text-xs"
                >
                    Close
                </button>
            </div>

            {/* Feed */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {opportunities.length === 0 ? (
                    <div className="text-center text-slate-500 py-10">
                        Waiting for incoming signals...
                    </div>
                ) : (
                    opportunities.map((opp) => (
                        <div
                            key={opp.postId}
                            className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-400/50 hover:shadow-md transition-all group shadow-sm relative overflow-hidden"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-700">
                                        {opp.author.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-slate-900 text-base">@{opp.author}</span>
                                            {opp.platform === 'reddit' ? (
                                                <span className="bg-orange-100 text-orange-600 text-[10px] px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">r/{opp.subreddit}</span>
                                            ) : opp.platform === 'rss' ? (
                                                <span className="bg-blue-100 text-blue-600 text-[10px] px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">Job Board</span>
                                            ) : (
                                                <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-400 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                                            )}
                                        </div>
                                        <div className="text-xs text-slate-500 hover:underline cursor-pointer flex items-center gap-1">
                                            {new Date(opp.timestamp).toLocaleTimeString()} • <a href={opp.url || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">View Source</a> <ExternalLink size={10} />
                                        </div>
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${opp?.analysis?.confidence === 'High' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                                    opp?.analysis?.confidence === 'Medium' ? 'bg-amber-50 border-amber-200 text-amber-600' :
                                        'bg-slate-100 border-slate-200 text-slate-600'
                                    }`}>
                                    {opp?.analysis?.confidence === 'High' && <Activity size={12} />}
                                    {opp?.analysis?.confidence || 'Analyzing...'} Confidence
                                </div>
                            </div>

                            <p className="text-slate-800 text-sm mb-6 leading-relaxed whitespace-pre-line pl-12 relative z-10">
                                {opp.text}
                            </p>

                            {/* Grok Analysis Box */}
                            <div className="ml-12 bg-slate-50 rounded-xl p-4 border border-blue-100 relative group-hover:border-blue-200 transition-colors">
                                <div className="absolute -left-1 top-4 w-1 h-8 bg-blue-500 rounded-r-full"></div>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2 text-xs font-extrabold text-blue-700 uppercase tracking-wider">
                                        <Sparkles size={14} className="animate-pulse" />
                                        Neural Flash Analysis
                                    </div>
                                    <div className="text-[10px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                                        AI-PROCESSING-ID: {opp.postId?.substring(0, 8) || 'Unknown'}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Recommended Action</div>
                                        <div className="text-sm font-semibold text-slate-900 bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm">
                                            {opp?.analysis?.action || 'Pending...'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Market Sentiment</div>
                                        <div className="text-sm font-semibold text-slate-900 bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
                                            {(opp?.analysis?.sentiment === 'Bullish' || opp?.analysis?.sentiment === 'Excited' || opp?.analysis?.sentiment === 'Positive') ?
                                                <span className="w-2 h-2 rounded-full bg-emerald-500" /> :
                                                <span className="w-2 h-2 rounded-full bg-amber-500" />
                                            }
                                            {opp?.analysis?.sentiment || 'Analyzing'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OpportunityFeed;
