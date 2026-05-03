"use client";
import { useUser, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Dashboard() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <main className="min-h-screen bg-[#0a0a0d] text-white font-sans flex">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-20 border-r border-gray-900 flex flex-col items-center py-8 gap-10">
        <div className="text-2xl">🌍</div>
        <nav className="flex flex-col gap-8 opacity-40">
          <Link href="/" className="hover:opacity-100 transition-all">🏠</Link>
          <div className="cursor-pointer hover:opacity-100 border-l-2 border-[#ff7e33] pl-2">📑</div>
          <div className="cursor-pointer hover:opacity-100">🔒</div>
          <div className="cursor-pointer hover:opacity-100">⚙️</div>
        </nav>
      </aside>

      <section className="flex-grow p-8 sm:p-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-marker font-bold mb-2">My Command Center</h1>
            <p className="text-gray-500 font-serif italic">Welcome back, {user?.firstName || 'Explorer'}.</p>
          </div>
          <div className="bg-[#13141b] border border-[#2a2b36] p-2 rounded-2xl flex items-center gap-4">
            <div className="text-right px-2">
              <p className="text-[9px] uppercase font-bold text-gray-500 tracking-widest">Account Status</p>
              <p className="text-[10px] text-[#1db992] font-bold">PRO MEMBER</p>
            </div>
            <img src={user?.imageUrl} className="w-10 h-10 rounded-xl" />
          </div>
        </header>

        {/* AI SCOUT WIDGET */}
        <div className="bg-gradient-to-r from-[#13141b] to-[#0f0f13] border border-[#2a2b36] rounded-[2rem] p-8 mb-12 flex items-center justify-between relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 text-9xl opacity-5 group-hover:rotate-12 transition-transform">🤖</div>
          <div className="relative z-10">
            <span className="bg-[#ff7e33]/10 text-[#ff7e33] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">AI Scout Active</span>
            <h3 className="text-2xl font-marker font-bold mb-2">Embassy Update Detected</h3>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">I noticed you're working on the 'Digital Nomad Visa' roadmap. Spain just updated their income requirements. Sync your checklist to stay compliant.</p>
          </div>
          <button className="bg-white text-black px-6 py-3 rounded-xl font-marker font-bold uppercase text-sm shadow-xl hover:scale-105 transition-all">Sync Roadmap</button>
        </div>

        {/* ROADMAP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#13141b] border border-[#2a2b36] p-6 rounded-[2rem] relative group cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-2xl">💼</div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Progress</p>
                <p className="text-xl font-marker font-bold text-blue-500">75%</p>
              </div>
            </div>
            <h4 className="text-xl font-marker font-bold mb-1">Get a UK Tech Job</h4>
            <p className="text-xs text-gray-500 mb-6 font-serif italic">Next Step: Technical Interview Prep</p>
            <div className="w-full h-1 bg-gray-900 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-blue-500"></div>
            </div>
          </div>

          {/* EMPTY STATE / RECOMMENDED */}
          <div className="border-2 border-dashed border-[#2a2b36] rounded-[2rem] p-6 flex flex-col items-center justify-center text-center opacity-50 hover:opacity-100 transition-all cursor-pointer">
            <span className="text-3xl mb-4">➕</span>
            <h4 className="font-marker font-bold">Start New Guide</h4>
            <p className="text-[10px] uppercase font-bold text-gray-500">Add to your vault</p>
          </div>
        </div>
      </section>
    </main>
  );
}
