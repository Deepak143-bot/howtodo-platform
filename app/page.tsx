"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

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

  const handleSearch = async (term = query) => {
    if (!term) return;
    setLoading(true);
    setProgress(0);
    setResults([]);
    try {
      const res = await fetch(`/api/search?q=${term}`);
      const data = await res.json();
      if (data && data.length > 0) { 
        setResults(data[0].steps); 
      } else {
        const aiRes = await fetch('/api/ai', { method: 'POST', body: JSON.stringify({ prompt: term }) });
        const aiData = await aiRes.json();
        setResults(aiData.steps || []);
      }
    } finally {
      setLoading(false);
    }
  };

  // --- DARK MODE EXPERT ROADMAP ---
  if (results.length > 0) {
    return (
      <main className="min-h-screen bg-[#0f0f13] text-white p-4 sm:p-6 font-sans w-full selection:bg-[#ff7e33]/30 flex flex-col">
        <div className="w-full max-w-[600px] mx-auto pt-8 sm:pt-12 pb-10 flex-grow">
          
          <div className="flex justify-center mb-6">
            <span className="bg-[#1c1613] text-[#ff7e33] border border-[#ff7e33]/30 px-5 py-1.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest flex items-center gap-2">
              🚀 AI-POWERED GUIDE
            </span>
          </div>
          
          <h1 className="text-[2.5rem] sm:text-5xl font-marker font-bold text-center mb-4 leading-[1.1]">
            Start <span className="text-[#ff7e33] capitalize">{query}</span><br />
            Step by Step
          </h1>
          <p className="text-center text-gray-400 font-marker text-base sm:text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Your complete beginner roadmap — from zero to first step using AI tools. Tick off each task as you go.
          </p>
          
          <div className="bg-[#13141b] p-5 sm:p-6 rounded-2xl border border-[#2a2b36] mb-8 sticky top-4 z-50 shadow-2xl">
            <div className="flex justify-between items-end mb-3">
              <span className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-[0.2em]">YOUR PROGRESS</span>
              <span className="text-[#ff7e33] font-marker text-sm">{progress} / {results.length * 3} steps</span>
            </div>
            <div className="h-1.5 bg-[#22242e] rounded-full overflow-hidden">
              <div className="h-full bg-[#ff7e33] transition-all duration-700 ease-out" style={{ width: `${(progress/(results.length*3))*100}%` }}></div>
            </div>
          </div>

          <div className="space-y-5">
            {results.map((step, i) => (
              <div key={i} className={`bg-[#13141b] rounded-3xl border ${i === 0 ? 'border-[#ff7e33]/50' : 'border-[#2a2b36]'} p-6 sm:p-8 relative overflow-hidden transition-all duration-300 hover:border-[#ff7e33]/40`}>
                
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 flex-shrink-0 bg-[#22242e] rounded-xl flex items-center justify-center text-2xl">
                    {['🏢', '🎯', '🔍', '🏪', '🤖', '📢'][i % 6]}
                  </div>
                  <div className="flex-1 pt-0.5">
                    <p className="text-[9px] font-sans font-bold text-[#ff7e33] uppercase tracking-[0.25em] mb-1.5">STEP {i+1}</p>
                    <h3 className="text-2xl sm:text-[1.7rem] font-marker font-bold text-white leading-none mb-2">{step.title}</h3>
                    <p className="text-gray-500 font-sans text-[10px] tracking-wide flex items-center gap-1">⏱ 1-2 days</p>
                  </div>
                </div>
                
                <p className="text-gray-300 font-marker text-[17px] sm:text-lg leading-relaxed mb-6">
                  {step.desc}
                </p>

                <div className="space-y-4 mb-8">
                  <p className="text-[11px] font-sans font-bold text-[#8dc476] uppercase tracking-widest flex items-center gap-2 mb-4">
                    ✅ ACTION CHECKLIST
                  </p>
                  {step.checklist?.map((item, j) => (
                    <label key={j} className="flex items-start gap-4 cursor-pointer group/item">
                      <input 
                        type="checkbox" 
                        onChange={(e) => setProgress(p => e.target.checked ? p + 1 : p - 1)} 
                        className="w-5 h-5 mt-1 rounded-[4px] border border-gray-600 bg-[#22242e] checked:bg-[#ff7e33] checked:border-[#ff7e33] transition-all cursor-pointer appearance-none relative flex-shrink-0 before:content-[''] before:absolute before:hidden checked:before:block before:left-[6px] before:top-[2px] before:w-[6px] before:h-[11px] before:border-solid before:border-white before:border-r-2 before:border-b-2 before:rotate-45" 
                      />
                      <span className="text-gray-400 font-marker text-[16px] sm:text-[17px] leading-snug group-hover/item:text-white transition-colors">{item}</span>
                    </label>
                  ))}
                </div>

                {step.tools && step.tools.length > 0 && (
                  <div className="mb-8">
                    <p className="text-[10px] font-sans font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-3">
                      🛠️ AI TOOLS TO USE
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {step.tools.map((t, k) => (
                        <span key={k} className="bg-[#162724] text-[#42c59a] border border-[#42c59a]/20 px-3 py-1.5 rounded-lg font-marker text-sm tracking-wide">
                          ✓ {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {step.tip && (
                  <div className="bg-[#241f17] border border-[#ff7e33]/20 p-4 sm:p-5 rounded-2xl mb-8 flex items-start gap-3">
                    <span className="text-xl">💡</span>
                    <p className="text-[15px] sm:text-base font-marker text-[#f1c27d] leading-relaxed pt-0.5">
                      <span className="font-bold mr-1">Pro Tip:</span> 
                      {step.tip}
                    </p>
                  </div>
                )}

                <button className="w-full bg-gradient-to-r from-[#ff7e33] to-[#ff5e00] hover:from-[#ff8f4a] hover:to-[#ff6d1a] text-white py-4 rounded-xl font-marker text-lg transition-all active:scale-[0.98]">
                  Mark Step as Complete
                </button>

              </div>
            ))}
          </div>
          
          {/* Dark Mode Footer with Legal Links */}
          <div className="mt-12 pt-8 border-t border-[#2a2b36] flex flex-col sm:flex-row justify-between items-center gap-6">
            <button onClick={() => {setResults([]); setProgress(0); setQuery('');}} className="text-gray-500 font-sans font-bold text-[10px] tracking-[0.3em] uppercase hover:text-white transition-colors">
              ← Back to Home
            </button>
            <div className="flex gap-6 text-[10px] font-sans font-bold text-gray-600 tracking-[0.2em] uppercase">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <span className="opacity-20">|</span>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>

        </div>
      </main>
    );
  }

  // --- CREAM EDITORIAL HOMEPAGE ---
  return (
    <main className="min-h-screen bg-cream text-black overflow-x-hidden w-full font-sans flex flex-col">
      <header className="w-full flex items-center px-4 sm:px-8 py-3 sm:py-4 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto w-full flex items-center">
          <span className="text-xl sm:text-2xl mr-2">🌍</span>
          <span className="font-marker font-bold text-xl sm:text-2xl mr-2 text-black">HowToDo</span>
          <span className="font-sans font-bold text-[9px] sm:text-[10px] tracking-[0.25em] uppercase opacity-40" style={{ WebkitTextStroke: '1px #666', color: 'transparent' }}>WORLD</span>
        </div>
      </header>

      <div className="flex-grow">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-8 pt-10 sm:pt-16 pb-10">
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {['🇺🇸 USA', '🇬🇧 UK', '🇮🇳 India', '🇩🇪 Germany', '🇯🇵 Japan', '🇧🇷 Brazil'].map(c => (
              <span key={c} className="bg-white border border-gray-200 px-2.5 py-1 text-[10px] text-gray-500 shadow-sm rounded-sm font-sans flex items-center">
                {c}
              </span>
            ))}
            <span className="bg-white/50 border border-gray-200 px-2.5 py-1 text-[10px] text-gray-400 rounded-sm font-sans">195+ countries</span>
          </div>

          <h1 className="font-marker font-bold text-6xl sm:text-7xl lg:text-[6rem] leading-[1.05] mb-4 text-black tracking-tight max-w-3xl">
            How to do<br/>
            <span className="text-teal">anything,</span><br/>
            anywhere.
          </h1>

          <p className="font-serif italic text-gray-400 text-xl sm:text-2xl mb-8 max-w-2xl">
            e.g. "open a bank account in Germany"
          </p>

          <div className="flex w-full max-w-2xl border-[3px] border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <input 
              type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="I want to..." 
              className="w-full flex-1 p-4 sm:p-5 font-serif italic text-gray-700 outline-none text-lg placeholder:text-gray-300 min-w-0" 
            />
            <button onClick={() => handleSearch()} className="bg-black text-white px-6 sm:px-8 py-4 sm:py-5 font-marker tracking-widest text-[11px] uppercase flex-shrink-0 hover:bg-gray-900 active:bg-teal transition-colors">
              {loading ? '...' : 'Guide Me'}
            </button>
          </div>
        </div>

        <div className="w-full border-y border-gray-200 bg-white/60">
          <div className="w-full max-w-4xl mx-auto grid grid-cols-3 text-center py-6 divide-x divide-gray-200">
             <div className="px-2 flex flex-col items-center">
               <div className="flex items-center gap-1.5 mb-1">
                 <span className="text-xl sm:text-2xl">🌍</span>
                 <span className="font-marker font-bold text-xl sm:text-2xl text-black">195+</span>
               </div>
               <div className="text-[8px] sm:text-[9px] text-gray-400 uppercase tracking-widest font-sans font-bold">Countries Covered</div>
             </div>
             <div className="px-2 flex flex-col items-center">
               <div className="flex items-center gap-1.5 mb-1">
                 <span className="text-xl sm:text-2xl">📚</span>
                 <span className="font-marker font-bold text-xl sm:text-2xl text-black">1,000+</span>
               </div>
               <div className="text-[8px] sm:text-[9px] text-gray-400 uppercase tracking-widest font-sans font-bold">Life Situations</div>
             </div>
             <div className="px-2 flex flex-col items-center">
               <div className="flex items-center gap-1.5 mb-1">
                 <span className="text-xl sm:text-2xl text-gray-400">🔢</span>
                 <span className="font-marker font-bold text-xl sm:text-2xl text-black">80k+</span>
               </div>
               <div className="text-[8px] sm:text-[9px] text-gray-400 uppercase tracking-widest font-sans font-bold">Personalized Guides</div>
             </div>
          </div>
        </div>

        <div className="w-full max-w-4xl mx-auto px-6 py-12 sm:py-16">
           <h2 className="font-marker font-bold text-4xl sm:text-4xl leading-tight mb-2 text-black">Every life domain. Every country.</h2>
           <p className="font-serif italic text-gray-400 mb-8 sm:mb-10 text-sm sm:text-base max-w-2xl">Click a category or type freely — there are no limits to what you can ask.</p>

           <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {categories.map((cat, i) => (
                <div key={i} onClick={() => {setQuery(cat.n); handleSearch(cat.n);}} className="bg-[#fdfcf9] border border-gray-200 p-5 cursor-pointer flex flex-col justify-start shadow-sm hover:border-black transition-colors group">
                  <div className="text-3xl mb-3 transition-transform group-hover:scale-110 origin-left">{cat.i}</div>
                  <h3 className="font-marker font-bold text-[16px] sm:text-lg leading-tight mb-1.5 text-black group-hover:text-teal transition-colors">{cat.n}</h3>
                  <p className="font-serif italic text-gray-400 text-[11px] leading-snug">{cat.d}</p>
                </div>
              ))}
           </div>
           
           <div className="flex justify-center w-full mt-10">
             <button className="px-8 py-3 border border-gray-300 text-gray-400 font-marker text-[11px] uppercase tracking-[0.2em] bg-transparent hover:bg-white hover:text-black hover:border-black transition-all">
               Show all 20 categories ↓
             </button>
           </div>
        </div>
      </div>
      
      {/* Light Mode Footer with Legal Links */}
      <footer className="w-full bg-[#111] text-white py-16 px-6 text-center mt-auto">
         <p className="font-marker uppercase text-gray-500 tracking-[0.2em] text-[11px] mb-8">Works for people from every part of the world</p>
         <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-2xl sm:text-3xl max-w-[320px] mx-auto opacity-90 hover:opacity-100 transition-all duration-300">
           {['🇺🇸', '🇬🇧', '🇮🇳', '🇩🇪', '🇫🇷', '🇯🇵', '🇧🇷', '🇨🇳', '🇦🇺', '🇨🇦', '🇲🇽', '🇰🇷', '🇿🇦', '🇳🇬', '🇪🇸', '🇮🇹', '🇪🇬', '🇹🇷', '🇮🇩', '🇹🇭'].map((flag, i) => (
             <span key={i} className="cursor-default hover:scale-110 transition-transform">{flag}</span>
           ))}
         </div>
         <p className="font-marker text-gray-500 mt-6 text-xs italic mb-12">& 165 more</p>
         
         {/* Legal Sub-Footer */}
         <div className="pt-8 border-t border-gray-800/50 flex flex-wrap justify-center gap-6 sm:gap-10 text-[9px] sm:text-[10px] font-sans font-bold text-gray-500 tracking-[0.2em] uppercase">
           <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
           <span className="opacity-30">|</span>
           <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
         </div>
      </footer>
    </main>
  );
}
