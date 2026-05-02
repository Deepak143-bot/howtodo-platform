import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#f6f5ef] text-black overflow-x-hidden w-full font-sans">
      
      {/* Header */}
      <header className="w-full flex items-center px-4 sm:px-8 py-3 sm:py-4 bg-white border-b border-gray-200 sticky top-0 z-50">
        <Link href="/" className="max-w-5xl mx-auto w-full flex items-center hover:opacity-70 transition-opacity">
          <span className="text-xl sm:text-2xl mr-2">🌍</span>
          <span className="font-marker font-bold text-xl sm:text-2xl mr-2 text-black">HowToDo</span>
          <span className="font-sans font-bold text-[9px] sm:text-[10px] tracking-[0.25em] uppercase opacity-40" style={{ WebkitTextStroke: '1px #666', color: 'transparent' }}>WORLD</span>
        </Link>
      </header>

      {/* Content */}
      <div className="w-full max-w-3xl mx-auto px-6 py-16 sm:py-24">
        <h1 className="font-marker font-bold text-5xl sm:text-6xl mb-8 text-black tracking-tight">Privacy Policy</h1>
        
        <div className="space-y-10 font-serif text-gray-600 leading-relaxed text-lg sm:text-xl">
          <p className="text-sm font-sans tracking-widest uppercase text-gray-400 font-bold">Last updated: Today</p>
          
          <section>
            <h2 className="font-marker text-3xl text-black mb-4">1. Information We Collect</h2>
            <p>When you use HowToDo World, we process your search queries to generate AI-powered roadmaps. We do not store your personal identifiable information, IP addresses, or precise location data permanently on our servers.</p>
          </section>

          <section>
            <h2 className="font-marker text-3xl text-black mb-4">2. Use of Artificial Intelligence</h2>
            <p>Your search queries are transmitted to our secure AI partners to generate your step-by-step guides. Please avoid submitting highly sensitive personal data (such as financial information, passwords, or government IDs) into the search bar.</p>
          </section>

          <section>
            <h2 className="font-marker text-3xl text-black mb-4">3. Local Storage & Tracking</h2>
            <p>We use minimal local browser storage purely to maintain your application state, such as your roadmap checklist progress, during your active session. We do not use invasive cross-site tracking cookies or sell your data to advertisers.</p>
          </section>

          <section>
            <h2 className="font-marker text-3xl text-black mb-4">4. Your Rights</h2>
            <p>You have the right to clear your browser cache at any time, which will instantly erase any saved checklist progress on your device. Since we do not require user accounts, no data is tied directly to your identity.</p>
          </section>
        </div>

        <div className="mt-20">
          <Link href="/" className="inline-block px-10 py-5 border-[3px] border-black text-black font-marker text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
