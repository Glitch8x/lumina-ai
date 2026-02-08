import React, { useState, useRef, useEffect } from 'react';
import { supabase } from './supabase'; // [NEW] Supabase Client
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, setDoc } from 'firebase/firestore'; // Keeping Firestore for now as per plan
import { auth, db } from './firebase'; // Keeping Firebase DB for now
import Groq from 'groq-sdk';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Send, Bot, User, Sparkles, Menu, Shield, Globe, Code, Cpu, TrendingUp, Paperclip, Activity, BookOpen, LayoutDashboard, Settings, Trash2 } from 'lucide-react';
import { LUMINA_SYSTEM_PROMPT } from './constants';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import OpportunityFeed from './components/OpportunityFeed';
import TradingTerminal from './components/TradingTerminal';
import CryptoAcademy from './components/CryptoAcademy';
import RoadmapArchitect from './components/RoadmapArchitect';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [session, setSession] = useState(null); // [NEW] Supabase Session

  useEffect(() => {
    // [NEW] Supabase Auth Listener
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoggedIn(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!supabase) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-950 text-white p-4">
        <div className="max-w-md w-full bg-slate-900 border border-red-500/30 rounded-2xl p-8 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-red-500/5 pointer-events-none"></div>
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto border border-red-500/30">
            <Shield size={32} className="text-red-500" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white mb-2">System Failure</h1>
            <p className="text-slate-400">
              Supabase configuration is missing. The application cannot initialize the neural link.
            </p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <AlertCircle size={12} /> Diagnostic Code: ENV_MISSING
            </div>
            <p className="text-xs text-slate-300 font-mono break-all">
              VITE_SUPABASE_URL<br />
              VITE_SUPABASE_ANON_KEY
            </p>
          </div>
          <div className="text-xs text-slate-500">
            Please verify Vercel Project Settings &gt; Environment Variables.
          </div>
        </div>
      </div>
    );
  }


  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: "Greetings. I am Lumina, your Web3 Career Architect and Autonomous Scout. How may I assist your ascent into the decentralized economy today?",
    },
  ]);

  const clearChat = () => {
    setMessages([{
      role: 'model',
      text: "Neural link reset. All previous memory wiped. How may I assist your ascent into the decentralized economy today?",
    }]);
  };
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const groqKey = import.meta.env.VITE_GROQ_API_KEY;

  // Persistence Logic
  useEffect(() => {
    if (!auth || !db || !auth.currentUser) return;

    const q = query(
      collection(db, 'users', auth.currentUser.uid, 'chats'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dbMessages = snapshot.docs.map(doc => ({
        role: doc.data().role,
        text: doc.data().text,
        // handle file if needed (omitted for simplicity if not storing file in fs yet)
      }));

      if (dbMessages.length > 0) {
        setMessages(dbMessages);
      }
    });

    return () => unsubscribe();
  }, [isLoggedIn]); // Re-run when login state changes

  // Navigation State: 'chat', 'monitor', 'trading', 'academy', 'roadmap'
  const [activeView, setActiveView] = useState('chat');

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeView === 'chat' && !showLanding) {
      scrollToBottom();
    }
  }, [messages, activeView, showLanding]);

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Helper to switch to chat and optionally start a task
  const handleNavigateToChat = (text) => {
    setActiveView('chat');
    if (text) {
      // Auto-send the message for "Real Time" feel
      handleSend(text);
    }
  };

  const handleFunctionClick = (view, starterText) => {
    if (view === 'Chat') {
      handleNavigateToChat(starterText);
    } else {
      // Direct View Switches
      if (view === 'Opportunity') setActiveView('monitor');
      else if (view === 'DeFi') setActiveView('trading');
      else if (view === 'Academy') setActiveView('academy');
      else if (view === 'Roadmap') setActiveView('roadmap');
      else {
        handleNavigateToChat(starterText);
      }
    }
  };

  const handleSend = async (manualInput) => {
    const textToSend = typeof manualInput === 'string' ? manualInput : input;

    if ((!textToSend.trim() && !selectedFile) || !groqKey) return;

    const userMessage = {
      role: 'user',
      text: textToSend,
      file: selectedFile ? { name: selectedFile.name, type: selectedFile.type } : null
    };

    let filePart = null;
    if (selectedFile) {
      const reader = new FileReader();
      const base64Promise = new Promise((resolve) => {
        reader.onload = (e) => {
          const base64Data = e.target.result.split(',')[1];
          resolve({
            inlineData: {
              data: base64Data,
              mimeType: selectedFile.type
            }
          });
        };
      });
      reader.readAsDataURL(selectedFile);
      filePart = await base64Promise;
    }

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setSelectedFile(null);
    setIsLoading(true);

    // Persist User Message
    if (auth && db && auth.currentUser) {
      addDoc(collection(db, 'users', auth.currentUser.uid, 'chats'), {
        role: 'user',
        text: textToSend,
        createdAt: serverTimestamp()
      });
    }

    try {
      // Groq Core Flow
      const groq = new Groq({ apiKey: groqKey, dangerouslyAllowBrowser: true });

      const groqMessages = [
        { role: "system", content: LUMINA_SYSTEM_PROMPT },
        ...messages.map(m => ({
          role: m.role === 'model' ? 'assistant' : 'user',
          content: m.text
        })),
        { role: "user", content: textToSend }
      ];

      const completion = await groq.chat.completions.create({
        messages: groqMessages,
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 2000,
      });

      const responseText = completion.choices[0]?.message?.content || "No response.";

      setMessages((prev) => [...prev, { role: 'model', text: responseText }]);

      // Persist AI Response
      if (auth && db && auth.currentUser) {
        addDoc(collection(db, 'users', auth.currentUser.uid, 'chats'), {
          role: 'model',
          text: responseText,
          createdAt: serverTimestamp()
        });
      }

    } catch (error) {
      const errStr = String(error).toLowerCase();
      const isQuotaError = errStr.includes('quota') || errStr.includes('429');
      const isFetchError = errStr.includes('fetch');

      const friendlyMessage = isQuotaError
        ? "Groq neural nodes are saturated. Please give me 60 seconds to reset my pathways and try your message again. ⚡"
        : isFetchError
          ? "I've lost synchronization with the Groq lattice. Please check your connection and I'll be ready to assist again."
          : `Lumina Groq error: ${error.message || 'Unstable connection detected.'}`;

      setMessages((prev) => [
        ...prev,
        { role: 'model', text: friendlyMessage },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex-col hidden md:flex z-20 shadow-sm">
        <div className="p-6 flex items-center gap-3 border-b border-slate-100">
          <img src="/lumina-new-logo.png" alt="Lumina AI Logo" className="w-8 h-8 object-contain" />
          <h1 className="font-bold text-xl tracking-tight text-slate-900">Lumina AI</h1>
        </div>

        <div className="p-4 space-y-2 overflow-y-auto flex-1">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Core Functions</div>

          <div
            onClick={() => setActiveView('chat')}
            className={`p-3 rounded-xl transition-all cursor-pointer flex items-center gap-3 group ${activeView === 'chat' ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100' : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900'}`}
          >
            <div className={`p-1.5 rounded-lg ${activeView === 'chat' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-sm'}`}>
              <LayoutDashboard size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold">Dashboard</div>
            </div>
          </div>

          <div
            onClick={() => handleFunctionClick("Roadmap", "")}
            className={`p-3 rounded-xl transition-all cursor-pointer flex items-center gap-3 group ${activeView === 'roadmap' ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100' : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900'}`}
          >
            <div className={`p-1.5 rounded-lg ${activeView === 'roadmap' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-sm'}`}>
              <Code size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold">Roadmap Architect</div>
            </div>
          </div>

          <div
            onClick={() => handleFunctionClick("Opportunity", "")}
            className={`p-3 rounded-xl transition-all cursor-pointer flex items-center gap-3 group ${activeView === 'monitor' ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100' : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900'}`}
          >
            <div className={`p-1.5 rounded-lg ${activeView === 'monitor' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-sm'}`}>
              <Globe size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold">Opportunity Hunter</div>
            </div>
          </div>

          <div
            onClick={() => handleFunctionClick("DeFi", "Analyze the current market structure for ETH/USD (Futures Mode).")}
            className={`p-3 rounded-xl transition-all cursor-pointer flex items-center gap-3 group ${activeView === 'trading' ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100' : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900'}`}
          >
            <div className={`p-1.5 rounded-lg ${activeView === 'trading' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-sm'}`}>
              <TrendingUp size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold">Trading Terminal</div>
            </div>
          </div>

          <div
            onClick={() => handleFunctionClick("Academy", "Teach me about Futures Trading Risk Management. Start with Module 1.")}
            className={`p-3 rounded-xl transition-all cursor-pointer flex items-center gap-3 group ${activeView === 'academy' ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100' : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900'}`}
          >
            <div className={`p-1.5 rounded-lg ${activeView === 'academy' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-sm'}`}>
              <BookOpen size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold">Crypto Academy</div>
            </div>
          </div>

          <div
            onClick={() => setActiveView('monitor')}
            className={`p-3 rounded-xl transition-all cursor-pointer flex items-center gap-3 group mt-4 border-t border-slate-100 ${activeView === 'monitor_live' ? 'bg-red-50 text-red-700 shadow-sm ring-1 ring-red-100' : 'hover:bg-red-50 text-slate-600 hover:text-red-700'}`}
          >
            <div className={`p-1.5 rounded-lg ${activeView === 'monitor_live' ? 'bg-red-100 text-red-600' : 'bg-red-50 text-red-500 group-hover:bg-red-100'}`}>
              <Activity size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold">Live Monitor</div>
              <div className="text-xs text-slate-400 font-normal">X / Grok Stream</div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50/50 space-y-3">
          {session?.user && (
            <div className="flex items-center gap-3 px-2 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 p-[2px]">
                <div className="w-full h-full rounded-full bg-slate-50 overflow-hidden">
                  {session.user.user_metadata?.avatar_url ? (
                    <img src={session.user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-500 font-bold text-sm">
                      {session.user.email?.[0].toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">
                  {session.user.user_metadata?.full_name || 'Lumina User'}
                </p>
                <p className="text-xs text-slate-500 truncate font-medium">
                  {session.user.email}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={async () => {
              await supabase.auth.signOut();
              setIsLoggedIn(false);
              setSession(null);
            }}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium group"
          >
            <div className="p-1.5 bg-white border border-slate-200 rounded-md group-hover:border-red-200">
              <Trash2 size={14} className="group-hover:text-red-500" />
            </div>
            <span>Sign Out</span>
          </button>

          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium px-2 py-1 justify-center">
            <Shield size={12} />
            <span>Secure Gemini Flash Link</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-0 overflow-hidden">
        {/* Pass explicit layout props/styles to sub-components if needed in future steps */}
        {activeView === 'monitor' && <OpportunityFeed onClose={() => setActiveView('chat')} />}
        {activeView === 'trading' && <TradingTerminal onNavigateToChat={(mode, query) => handleNavigateToChat(query)} />}
        {activeView === 'academy' && <CryptoAcademy onStartLesson={(query) => handleNavigateToChat(query)} />}
        {activeView === 'roadmap' && <RoadmapArchitect onGenerateRoadmap={(query) => handleNavigateToChat(query)} />}

        {activeView === 'chat' && (
          <>
            {/* Header (Mobile only) */}
            <header className="md:hidden p-4 border-b border-slate-200 flex items-center gap-3 bg-white sticky top-0 z-10">
              <img src="/lumina-new-logo.png" alt="Lumina AI Logo" className="w-8 h-8 object-contain" />
              <h1 className="font-bold text-xl text-slate-900">LUMINA</h1>
            </header>

            {/* Chat Area */}
            <div className="absolute top-4 right-6 z-10 hidden md:flex items-center gap-2 bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 shadow-sm pointer-events-none select-none">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Powered by</span>
              <div className="flex items-center gap-1.5 text-slate-700 font-bold text-xs">
                <img src="/gemini-logo.jpg" alt="Gemini" className="w-4 h-4 object-contain" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7c4dff] via-[#448aff] to-[#00bcd4]">
                  Gemini Flash
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 mt-1 shadow-md shadow-blue-500/5 bg-white border border-slate-100">
                      <img src="/lumina-new-logo.png" alt="Lumina Bot" className="w-full h-full object-contain" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-6 py-4 shadow-sm ${msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-blue-600/20'
                      : 'bg-white border border-slate-200 rounded-bl-none prose prose-slate prose-p:my-1 text-slate-700'
                      }`}
                  >
                    {msg.role === 'user' ? (
                      <div>
                        <p className="whitespace-pre-wrap font-medium">{msg.text}</p>
                        {msg.file && (
                          <div className="mt-2 text-xs bg-white/20 p-2 rounded flex items-center gap-2">
                            <Paperclip size={12} />
                            {msg.file.name}
                          </div>
                        )}
                      </div>
                    ) : (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.text || ''}
                      </ReactMarkdown>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center flex-shrink-0 mt-1">
                      <User size={18} className="text-slate-500" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4 items-center">
                  <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 opacity-50 bg-white border border-slate-100 shadow-sm">
                    <img src="/lumina-new-logo.png" alt="Loading" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex items-center gap-1 h-6 px-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 md:p-6 bg-white/80 backdrop-blur-md border-t border-slate-200 z-10">
              <div className="max-w-4xl mx-auto relative group">
                <div className="absolute left-3 top-4 flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileSelect}
                    accept="image/*,application/pdf"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-2 rounded-lg hover:bg-slate-100 transition-colors ${selectedFile ? 'text-blue-600' : 'text-slate-400'}`}
                    title="Upload Image/PDF"
                  >
                    <Paperclip size={18} />
                  </button>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Lumina to architect your web3 career..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-14 py-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none h-[60px] md:h-[70px] placeholder:text-slate-400 text-slate-900 font-medium shadow-inner"
                />
                {selectedFile && (
                  <div className="absolute left-14 top-[-30px] bg-white border border-slate-200 px-3 py-1 rounded-t-lg text-xs text-blue-600 flex items-center gap-2 shadow-sm">
                    <span>{selectedFile.name}</span>
                    <button onClick={() => setSelectedFile(null)} className="hover:text-red-500">×</button>
                  </div>
                )}
                <button
                  onClick={handleSend}
                  disabled={isLoading || (!input.trim() && !selectedFile)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="text-center mt-3 text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                Lumina Web3 Agent • Powered by Google Gemini Flash
              </div>
            </div>
          </>
        )}
      </main>

      {/* API Key Modal Removed */}
    </div>
  );
}

export default App;
