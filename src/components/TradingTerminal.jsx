import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Activity, BarChart2, DollarSign, Brain, MoveRight, RefreshCcw, Search, ExternalLink, Zap, AlertTriangle } from 'lucide-react';

const TradingTerminal = ({ onNavigateToChat }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [marketData, setMarketData] = useState(null);
    const [memeCoins, setMemeCoins] = useState([]);
    const [degenPairs, setDegenPairs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const tabs = [
        { id: 'overview', label: 'Market Overview', icon: Activity },
        { id: 'degen', label: 'Degen Scanner', icon: Zap },
        { id: 'futures', label: 'Futures Station', icon: BarChart2 },
        { id: 'forex', label: 'Forex Desk', icon: DollarSign },
    ];

    const fetchMarketData = async () => {
        setIsLoading(true);
        try {
            // Fetch Global Market Data (CoinGecko)
            const globalRes = await fetch('https://api.coingecko.com/api/v3/global');
            const globalJson = await globalRes.json();
            setMarketData(globalJson.data);

            // Fetch Meme Coins (CoinGecko)
            const memeRes = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=meme-token&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h');
            const memeJson = await memeRes.json();
            setMemeCoins(memeJson);

            // Fetch Degen Pairs (DexScreener - Solana Trending)
            const degenRes = await fetch('https://api.dexscreener.com/latest/dex/search/?q=solana');
            const degenJson = await degenRes.json();
            if (degenJson.pairs) {
                setDegenPairs(degenJson.pairs.slice(0, 10));
            }

        } catch (error) {
            console.error('Error fetching market data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMarketData();
        const interval = setInterval(fetchMarketData, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    // TradingView Widget
    const container = useRef();
    useEffect(() => {
        if (activeTab === 'futures' && container.current) {
            // Clear previous widget if any
            container.current.innerHTML = '';

            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = JSON.stringify({
                "autosize": true,
                "symbol": "BINANCE:BTCUSDT",
                "interval": "D",
                "timezone": "Etc/UTC",
                "theme": "light",
                "style": "1",
                "locale": "en",
                "enable_publishing": false,
                "allow_symbol_change": true,
                "calendar": false,
                "support_host": "https://www.tradingview.com"
            });
            container.current.appendChild(script);
        }
    }, [activeTab]);


    const handleStartAnalysis = (mode, query) => {
        onNavigateToChat(mode, query);
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 text-slate-900 overflow-hidden p-6 animated-in selection:bg-emerald-100 font-sans">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600 mb-1 tracking-tight">
                        Lumina Terminal
                    </h2>
                    <p className="text-slate-500 font-medium text-sm flex items-center gap-2">
                        <Activity size={14} className="text-emerald-500 animate-pulse" />
                        Live Neural Market Surveillance
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={fetchMarketData}
                        disabled={isLoading}
                        className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-sm group"
                    >
                        <RefreshCcw size={18} className={`text-slate-400 group-hover:text-emerald-500 transition-all ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-200 mb-6 pb-px overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-all font-bold text-sm tracking-tight whitespace-nowrap ${activeTab === tab.id
                            ? 'border-emerald-500 text-emerald-700 bg-emerald-50/50'
                            : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-100/50'
                            }`}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Global Market Cap</h3>
                                <div className="text-4xl font-black text-slate-900 mb-1 tracking-tighter">
                                    ${marketData ? (marketData.total_market_cap.usd / 1e12).toFixed(2) : '---'}T
                                </div>
                                <div className={`text-xs font-bold flex items-center gap-1 ${marketData?.market_cap_change_percentage_24h_usd >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    <TrendingUp size={12} />
                                    {marketData ? marketData.market_cap_change_percentage_24h_usd.toFixed(1) : '---'}% (24h)
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">BTC Dominance</h3>
                                <div className="text-4xl font-black text-slate-900 mb-1 tracking-tighter">
                                    {marketData ? marketData.market_cap_percentage.btc.toFixed(1) : '---'}%
                                </div>
                                <div className="text-xs font-bold text-slate-400">Total Coins: {marketData?.active_cryptocurrencies || '---'}</div>
                            </div>

                            <div onClick={() => handleStartAnalysis('DeFi', 'Analyze current market sentiment and BTC flows')} className="bg-gradient-to-br from-emerald-500 to-cyan-500 p-6 rounded-2xl shadow-lg shadow-emerald-500/20 flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-all group overflow-hidden relative">
                                <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
                                    <Brain size={120} />
                                </div>
                                <div className="z-10">
                                    <h3 className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">Sentiment Link</h3>
                                    <div className="text-white text-2xl font-black">Ask Lumina AI</div>
                                </div>
                                <div className="flex items-center gap-2 text-white/90 text-sm font-bold mt-4 z-10">
                                    Get Alpha Insights <MoveRight size={16} />
                                </div>
                            </div>
                        </div>

                        {/* Recent Meme Performers */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                    <TrendingUp size={16} className="text-emerald-500" />
                                    Top Meme Performers
                                </h3>
                                <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200">LIVE COINGECKO</span>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {memeCoins.slice(0, 5).map((coin) => (
                                    <div key={coin.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                                            <div>
                                                <div className="font-bold text-slate-900 text-sm">{coin.name}</div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{coin.symbol}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-black text-slate-900 text-sm">${coin.current_price?.toLocaleString() || '0'}</div>
                                            <div className={`text-xs font-bold ${coin.price_change_percentage_24h >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                {coin.price_change_percentage_24h > 0 ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'degen' && (
                    <div className="space-y-6">
                        <div className="bg-purple-900 p-8 rounded-2xl border border-purple-700 shadow-2xl shadow-purple-900/40 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
                            <h1 className="text-white text-3xl font-black mb-2 tracking-tight flex items-center gap-3">
                                DEGEN SCANNER <div className="p-1 px-2 bg-purple-500 text-[10px] rounded-md animate-pulse uppercase">Active</div>
                            </h1>
                            <p className="text-purple-200/70 font-medium mb-6 max-w-lg">
                                Real-time DexScreener feed. Scanning for high-velocity Solana plays and fresh liquidity.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                    <Zap size={16} className="text-purple-500" />
                                    DexScreener Live Feed (Solana)
                                </h3>
                                <div className="flex gap-2">
                                    <a href="https://dexscreener.com/" target="_blank" rel="noreferrer" className="text-[10px] font-bold text-slate-500 hover:text-purple-600 bg-white px-2 py-1 rounded-md border border-slate-200 flex items-center gap-1">
                                        DexScreener <ExternalLink size={10} />
                                    </a>
                                    <a href="https://gmgn.ai/" target="_blank" rel="noreferrer" className="text-[10px] font-bold text-slate-500 hover:text-purple-600 bg-white px-2 py-1 rounded-md border border-slate-200 flex items-center gap-1">
                                        GMGN <ExternalLink size={10} />
                                    </a>
                                </div>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {degenPairs.length > 0 ? degenPairs.map((pair, idx) => (
                                    <div key={idx} className="p-4 flex items-center justify-between hover:bg-purple-50/50 transition-colors group cursor-pointer" onClick={() => window.open(pair.url, '_blank')}>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs font-bold text-slate-300 w-4">#{idx + 1}</span>
                                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                                                {pair.info?.imageUrl ? <img src={pair.info.imageUrl} alt="" className="w-full h-full object-cover" /> : <Zap size={18} className="text-slate-400" />}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 text-sm flex items-center gap-1">
                                                    {pair.baseToken.symbol} <span className="text-slate-400">/ {pair.quoteToken.symbol}</span>
                                                </div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter flex items-center gap-1">
                                                    {pair.dexId} • Vol: ${(pair.volume.h24 / 1000).toFixed(1)}k
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-black text-slate-900 text-sm">${pair.priceUsd}</div>
                                            <div className={`text-xs font-bold ${pair.priceChange.h24 >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                {pair.priceChange.h24 > 0 ? '+' : ''}{pair.priceChange.h24}%
                                            </div>
                                        </div>
                                        <div className="hidden md:block text-right min-w-[80px]">
                                            <div className="text-[10px] font-bold text-slate-400 uppercase">Liquidity</div>
                                            <div className="font-bold text-slate-700 text-xs">${pair.liquidity?.usd?.toLocaleString() || '0'}</div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="p-10 text-center flex flex-col items-center gap-3">
                                        <AlertTriangle className="text-slate-300" size={24} />
                                        <p className="text-slate-500 font-medium">Scanning the mempool...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'futures' && (
                    <div className="h-full flex flex-col">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 mb-4 flex justify-between items-center shadow-sm">
                            <div className="flex items-center gap-2">
                                <BarChart2 size={20} className="text-emerald-600" />
                                <h3 className="font-bold text-slate-900">TradingView Advanced Chart</h3>
                                <div className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase">Live</div>
                            </div>
                            <button
                                onClick={() => handleStartAnalysis('DeFi', 'Analyze the current BTC chart structure. What are the key support levels?')}
                                className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
                            >
                                <Brain size={12} /> AI Analysis
                            </button>
                        </div>
                        <div className="flex-1 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl" id="tv-chart-container" ref={container}>
                            {/* TradingView Widget Inject Here */}
                        </div>
                    </div>
                )}

                {activeTab === 'forex' && (
                    <div className="space-y-6">
                        <div className="bg-blue-50 p-8 rounded-2xl border border-blue-200 border-dashed">
                            <h3 className="text-2xl font-black text-blue-900 mb-2 flex items-center gap-3">
                                <DollarSign size={24} /> Global Macro Desk
                            </h3>
                            <p className="text-blue-800/60 font-medium mb-6">
                                Interest Rates, CPI Data, and Currency Strength Surveillance.
                            </p>
                            <button
                                onClick={() => handleStartAnalysis('DeFi', 'Macro Briefing for the week. Show CPI and Interest rate forecasts.')}
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-xl shadow-blue-500/20 transition-all flex items-center gap-2"
                            >
                                Macro Intelligence <Activity size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TradingTerminal;
