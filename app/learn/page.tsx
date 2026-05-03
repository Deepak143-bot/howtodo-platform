export default function Learn() {
  return (
    <main className="min-h-screen bg-[#f6f5ef] text-black p-8 font-sans">
      <div className="max-w-3xl mx-auto pt-20 text-center">
        <h1 className="font-marker text-6xl mb-8">Learn with AI</h1>
        <p className="font-serif italic text-2xl text-gray-400 mb-12">Mastering the art of doing anything, anywhere.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          <div className="p-6 bg-teal/10 border-2 border-teal rounded-2xl">
            <span className="text-3xl mb-4 block">🤖</span>
            <h3 className="font-marker text-xl mb-2">Prompt Engineering</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Learn how to ask our AI for better, more specific roadmaps.</p>
          </div>
          <div className="p-6 bg-[#ff7e33]/10 border-2 border-[#ff7e33] rounded-2xl">
            <span className="text-3xl mb-4 block">🌍</span>
            <h3 className="font-marker text-xl mb-2">Global Citizens</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Guides on visas, banking, and culture for 195+ countries.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
