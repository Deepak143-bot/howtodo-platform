"use client";
import { useState } from 'react';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';

export default function Home() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('home'); 
  const { isSignedIn, isLoaded, user } = useUser();

  const categories = [
    { n: "Visas & Immigration", d: "Apply for a tourist visa", i: "🛂" },
    { n: "Jobs & Career", d: "Write a CV/resume", i: "💼" },
    { n: "Education", d: "Apply to university", i: "🎓" },
    { n: "Money & Banking", d: "Open a bank account", i: "💰" },
    { n: "Health & Medical", d: "Register with a doctor", i: "⚕️" },
    { n: "Housing", d: "Rent an apartment abroad", i: "🏠" },
    { n: "Legal & Documents", d: "Get a birth certificate", i: "⚖️" },
    { n: "Driving & Transport", d: "Get a driving licence", i: "🚗" },
    { n: "Business", d: "Register a company", i: "🏢" },
    { n: "Cooking & Food", d: "Cook a traditional dish", i: "🍳" },
    { n: "Technology", d: "Learn to code", i: "💻" },
    { n: "Family & Children", d: "Register a birth", i: "👪" },
  ];

  const handleSearch = (t = query) => {
    if (!t) return;
    setLoading(true);
    const slug = t.trim().toLowerCase().replace(/ /g, '-');
    window.location.href = `/guide/${slug}`;
  };

  return (
    <main className="min-h-screen bg-[#f6f5ef] text-black font-sans flex flex-col">
      <header className="flex items-center justify-between px-5 sm:px-8 py-4 bg-white border-b border-gray-200 w-full sticky top-0 z-50">
        <div className="flex items-center cursor-pointer" onClick={() => setView('home')}>
          <span className="text-2xl mr-2">🌍</span>
          <span className="font-marker font-bold text-2xl mr-2">HowToDo</span>
          <span className="font-sans font-bold text-[10px] tracking-[0.2em] uppercase opacity-40 hidden sm:inline" style={{WebkitTextStroke:'1px #666', color:'transparent'}}>WORLD</span>
        </div>
        <div className="flex items-center gap-4">
           {isLoaded && isSignedIn && (
                <button 
                  onClick={() => setView(view === 'home' ? 'library' : 'home')} 
                  className={`text-[10px] font-bold uppercase tracking-widest px-3 py-2 rounded-lg transition-all ${view === 'library' ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
                >
                  {view === 'library' ? '← Back to Search' : 'My Library'}
                </button>
           )}
           <div className="flex items-center gap-3">
             {isLoaded && (isSignedIn ? <UserButton appearance={{elements:{avatarBox:"w-8 h-8 rounded-lg"}}} /> : <SignInButton forceRedirectUrl="/"><button className="text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-black">Sign In</button></SignInButton>)}
             <button className="bg-black text-white px-4 py-2 text-[10px] font-marker font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] active:translate-y-1 transition-all">Go Premium</button>
           </div>
        </div>
      </header>

      {view === 'home' ? (
        <div className="flex-grow flex flex-col items-center px-6 pt-16">
          <h1 className="font-marker font-bold text-5xl sm:text-7xl leading-[1.1] mb-8 text-center max-w-3xl tracking-tight">
            How to do <span className="text-[#1db992]">anything,</span> anywhere.
          </h1>
          
          <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="flex w-full max-w-2xl border-[3px] border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12 overflow-hidden">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="I want to..." className="w-full p-5 font-serif italic text-xl outline-none" />
            <button type="submit" disabled={loading} className="bg-black text-white px-8 font-marker font-bold uppercase text-sm border-l-[3px] border-black whitespace-nowrap min-w-[120px]">
              {loading ? "..." : 'GUIDE ME'}
            </button>
          </form>

          <div className="w-full max-w-5xl grid grid-cols-3 border-y border-gray-200 bg-white/60 py-8 mb-12 divide-x divide-gray-200">
             {[{l:'Countries',v:'🌍 195+'},{l:'Situations',v:'📚 1k+'},{l:'Guides',v:'🔢 80k+'}].map(s=>(<div key={s.l} className="flex flex-col items-center"><div className="font-marker font-bold text-2xl sm:text-3xl mb-1">{s.v}</div><div className="text-[9px] text-gray-400 uppercase font-bold tracking-widest font-sans">{s.l}</div></div>))}
          </div>

          <div className="w-full max-w-5xl mb-12 px-2">
            <div className="w-full bg-[#e6faeb] border-2 border-[#1db992] border-dashed rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 cursor-pointer hover:shadow-xl transition-all">
              <div className="flex items-center gap-5">
                <span className="text-4xl">🚀</span>
                <div className="text-left">
                  <h3 className="font-marker font-bold text-xl sm:text-2xl text-black mb-1">Upgrade to HowToDo World Pro</h3>
                  <p className="font-serif italic text-[14px] text-gray-500">Unlimited AI roadmaps & deeper research for only $9/mo</p>
                </div>
              </div>
              <button className="bg-[#1db992] text-white px-6 py-3 rounded-xl font-marker font-bold uppercase text-sm tracking-widest shadow-lg whitespace-nowrap">Learn More</button>
            </div>
          </div>

          <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 px-2">
            {categories.map((c, i) => (
              <div key={i} onClick={() => handleSearch(c.n)} className="bg-white border border-gray-200 p-6 cursor-pointer shadow-sm active:border-black hover:border-black transition-all flex flex-col items-start min-h-[140px]">
                <div className="text-3xl mb-3">{c.i}</div>
                <h3 className="font-marker font-bold text-[17px] text-black mb-1 leading-tight">{c.n}</h3>
                <p className="font-serif italic text-gray-500 text-[12px]">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="w-full bg-[#111] py-16 px-6 text-white mb-0 border-t border-black">
            <div className="max-w-5xl mx-auto text-left">
              <h2 className="font-marker font-bold text-3xl mb-2 text-white">Trending Guides</h2>
              <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar mt-8">
                {["YouTube Channel", "PAN Card", "Shopify Store", "US Visa"].map((item, i) => (
                  <div key={i} onClick={() => handleSearch(item)} className="flex-shrink-0 w-64 bg-[#1a1a1e] border border-gray-800 p-6 rounded-2xl cursor-pointer hover:border-[#ff7e33] transition-all group">
                    <div className="text-[#ff7e33] font-sans text-[10px] font-bold uppercase tracking-widest mb-3">Popular</div>
                    <h4 className="font-marker font-bold text-xl leading-tight group-hover:text-[#ff7e33] transition-colors">{item}</h4>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-[10px] text-gray-600 uppercase font-bold font-sans">AI Roadmap</span>
                      <span className="text-2xl font-marker text-gray-500 group-hover:text-[#ff7e33] transition-colors">→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-grow bg-[#0a0a0d] text-white p-8 sm:p-12">
          <div className="max-w-5xl mx-auto">
            <header className="mb-12">
              <h2 className="text-4xl font-marker font-bold mb-2">Welcome Back, {user?.firstName}</h2>
              <p className="text-gray-500 font-serif italic">Your personal technical vault.</p>
            </header>

            <div className="bg-gradient-to-r from-[#13141b] to-[#0f0f13] border border-[#2a2b36] rounded-[2rem] p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
              <div className="relative z-10">
                <span className="bg-[#ff7e33]/10 text-[#ff7e33] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">AI Scout Active</span>
                <h3 className="text-2xl font-marker font-bold mb-2">Roadmap Sync Available</h3>
                <p className="text-gray-400 text-sm max-w-md leading-relaxed font-sans">I've found 3 new technical updates for your active guides. Sync now to update your progress.</p>
              </div>
              <button className="bg-white text-black px-6 py-3 rounded-xl font-marker font-bold uppercase text-sm shadow-xl hover:scale-105 transition-all">Sync All</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#13141b] border border-[#2a2b36] p-8 rounded-[2.5rem] hover:border-[#ff7e33] transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-[#ff7e33]/10 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110">💼</div>
                  <div className="text-right">
                    <p className="text-[10px] text-[#ff7e33] font-bold uppercase tracking-widest">Progress</p>
                    <p className="text-xl font-marker font-bold">45%</p>
                  </div>
                </div>
                <h4 className="text-xl font-marker font-bold mb-1">Start Faceless Page</h4>
                <p className="text-[11px] text-gray-500 font-serif italic mb-6">Next: Optimize Hook Timing</p>
                <div className="w-full h-1 bg-gray-900 rounded-full overflow-hidden">
                  <div className="w-[45%] h-full bg-[#ff7e33]"></div>
                </div>
              </div>
              <div onClick={() => setView('home')} className="border-2 border-dashed border-[#2a2b36] rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center opacity-30 hover:opacity-100 transition-all cursor-pointer">
                <span className="text-3xl mb-4">➕</span>
                <h4 className="font-marker font-bold">New Project</h4>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="w-full bg-[#000] text-white py-16 px-6 text-center border-t border-gray-900 mt-auto">
         <div className="flex flex-wrap justify-center gap-4 text-2xl sm:text-3xl max-w-3xl mx-auto opacity-90 mb-12">
           {['🇺🇸','🇬🇧','🇮🇳','🇩🇪','🇫🇷','🇯🇵','🇧🇷','🇨🇳','🇦🇺','🇨🇦','🇲🇽','🇰🇷','🇿🇦','🇳🇬','🇪🇬','🇮🇩','🇹🇷'].map((f,i)=>(<span key={i} className="hover:scale-110 transition-transform cursor-default">{f}</span>))}
         </div>
         <p className="font-marker font-bold text-gray-800 text-lg">Built for the World © 2026</p>
      </footer>
    </main>
  );
}
